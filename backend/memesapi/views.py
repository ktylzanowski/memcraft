from .models import Meme, Comment, Notification
from .serializer import MemeSerializer, CommentSerializer, NotifcationSerializer
from random import choice
from rest_framework.response import Response
from rest_framework import status, permissions, viewsets
from django.shortcuts import get_object_or_404
from rest_framework.decorators import action
from rest_framework.renderers import JSONRenderer
from .pagination import CommentPagination, BoradPagination

class MemeView(viewsets.ModelViewSet):
    queryset = Meme.objects.filter()
    serializer_class = MemeSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    pagination_class = BoradPagination

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['user'] = self.request.user
        return context
    
    def create(self, request):
        user = request.user
        data = {
            "title": request.data.get("title"),
            "meme_image": request.FILES.get("meme_image"),
            "author": user.pk,
        }
        serializer = self.get_serializer(data=data)
        if serializer.is_valid():
            meme = serializer.save()
            return Response({"pk": meme.pk}, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    def destroy(self, request, pk=None):
        meme = get_object_or_404(Meme, pk=pk)
        if meme.author == request.user:
            meme.delete()
            return Response({"message": "Mem został usunięty."}, status=status.HTTP_204_NO_CONTENT)
        else:
            return Response({"error": "Nie masz uprawnień do usunięcia tego mema."}, status=status.HTTP_403_FORBIDDEN)


    @action(detail=False, renderer_classes=[JSONRenderer])
    def user_memes(self, request):
        user = request.user
        user_memes = self.queryset.filter(author=user)
        paginator = BoradPagination()
        paginated_memes = paginator.paginate_queryset(user_memes, request)
        serialized_memes = self.get_serializer(paginated_memes, many=True)
        return paginator.get_paginated_response(serialized_memes.data)
    
    @action(detail=False, renderer_classes=[JSONRenderer])
    def user_likes_memes(self, request):
        user = request.user
        liked_memes = user.meme_likes.all()
        serializer = self.get_serializer(liked_memes, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    @action(detail=False, renderer_classes=[JSONRenderer])
    def user_dislikes_memes(self, request):
        user = request.user
        disliked_memes = user.meme_dislikes.all()
        serializer = self.get_serializer(disliked_memes, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=True, renderer_classes=[JSONRenderer])
    def draw(self, request):
        meme_id = request.META.get("HTTP_MEME_ID")
        memes = self.queryset.exclude(id=meme_id) if meme_id else self.queryset
        if memes.exists():
            meme = choice(memes)
            serializer = self.get_serializer(meme)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(
                {"message": "Nie udało się złapać mema."},
                status=status.HTTP_404_NOT_FOUND,
            )

    @action(detail=True, renderer_classes=[JSONRenderer])
    def like(self, request):
        meme_id = request.data.get('id')
        meme = get_object_or_404(Meme, pk=meme_id)
        
        action = request.data.get('action')
        if action not in ['like', 'dislike']:
            return Response({'error': 'Nieprawidłowa akcja.'}, status=status.HTTP_400_BAD_REQUEST)

        if action == "like":
            meme.likes.add(request.user) 
            meme.dislikes.remove(request.user)
            Notification.create_like_notification(meme)
        elif action == "dislike":
            meme.dislikes.add(request.user)
            meme.likes.remove(request.user)
            Notification.create_dislike_notification(meme)

        total_likes = meme.total_likes()
        total_dislikes = meme.total_dislikes()
        response_data = {
            'total_likes': total_likes,
            'total_dislikes': total_dislikes
        }
        return Response(response_data, status=status.HTTP_200_OK)
        
class CommentView(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    pagination_class = CommentPagination

    def create(self, request):
        data = request.data
        meme_id = data.get('meme_id')
        meme = get_object_or_404(Meme, pk=meme_id)
        serializer = self.get_serializer(data=data)
        if serializer.is_valid():
            comment = serializer.save(author=request.user, meme=meme)
            serialized_comment = self.get_serializer(comment)
            Notification.create_comment_notification(meme)
            return Response({
                "message": "Komentarz dodany",
                "comment": serialized_comment.data,
            })
        else:
            return Response({"addCommentErrors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        
    def destroy(self, request, pk=None):
        comment = get_object_or_404(Comment, pk=pk)
        if comment.author == request.user:
            comment.delete()
            return Response({"message": "Komentarz został usunięty."}, status=status.HTTP_204_NO_CONTENT)
        else:
            return Response({"error": "Nie masz uprawnień do usunięcia tego komentarza."}, status=status.HTTP_403_FORBIDDEN)
        
    def list(self, request):
        meme_id = request.META.get("HTTP_MEME_ID")
        meme = get_object_or_404(Meme, pk=meme_id)
        comments = Comment.objects.filter(meme=meme)

        paginator = CommentPagination()
        paginated_comments = paginator.paginate_queryset(comments, request)

        serialized_comment = self.get_serializer(paginated_comments, many=True)
        return paginator.get_paginated_response(serialized_comment.data)
    
    @action(detail=True, renderer_classes=[JSONRenderer])
    def user_comments(self, request):
        user = request.user
        comments_meme = Comment.objects.filter(author=user)
        serialized_comments = self.get_serializer(comments_meme, context={"include_meme_data": True, "user": request.user}, many=True)
        return Response(serialized_comments.data, status=status.HTTP_200_OK)
    
class NotificationView(viewsets.ModelViewSet):
    queryset = Notification.objects.all()
    serializer_class = NotifcationSerializer
    permissions_classes = [permissions.IsAuthenticated]

    def list(self, request):
        user = request.user
        if not user:
            return Response({"error": "Musisz być zalogowany!"},  status=status.HTTP_400_BAD_REQUEST)
        notifcations = Notification.objects.filter(user=user)
        serialized_notifcations = self.get_serializer(notifcations, many=True)
        return Response(serialized_notifcations.data, status=status.HTTP_200_OK)
    
    @action(detail=False, renderer_classes=[JSONRenderer])
    def mark_all_as_read(self, request):
        user = request.user
        if not user:
            return Response({"error": "Musisz być zalogowany!"},  status=status.HTTP_400_BAD_REQUEST)
        Notification.objects.filter(user=user).update(is_read=True)
        return Response({"message": "Wszystkie powiadomienia zostały oznaczone jako przeczytane."}, status=status.HTTP_200_OK)