from .models import Meme, Comment
from .serializer import MemeSerializer, CommentSerializer
from random import choice
from rest_framework.response import Response
from rest_framework import status, permissions, viewsets
from django.shortcuts import get_object_or_404
from rest_framework.decorators import action
from rest_framework.renderers import JSONRenderer
from .pagination import CommentPagination, BoradPagination

class MemeView(viewsets.ModelViewSet):
    queryset = Meme.objects.all()
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

    @action(detail=True, renderer_classes=[JSONRenderer])
    def draw(self, request):
        meme_id = request.META.get("HTTP_MEME_ID")
        memes = self.queryset.exclude(id=meme_id) if meme_id else self.queryset
        if memes.exists():
            meme = choice(memes)
            serializer = self.get_serializer(meme)
            return Response({
            'meme': serializer.data,
            })
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
        elif action == "dislike":
            meme.dislikes.add(request.user)
            meme.likes.remove(request.user)

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
        serializer.is_valid(raise_exception=True)
        comment = serializer.save(author=request.user, meme=meme)
        serialized_comment = self.get_serializer(comment)
        return Response({
            "message": "Komentarz dodany",
            "comment": serialized_comment.data,
        })
    
    def list(self, request):
        meme_id = request.META.get("HTTP_MEME_ID")
        meme = get_object_or_404(Meme, pk=meme_id)
        comments = Comment.objects.filter(meme=meme)

        paginator = CommentPagination()
        paginated_comments = paginator.paginate_queryset(comments, request)

        serialized_comment = self.get_serializer(paginated_comments, many=True)
        return paginator.get_paginated_response(serialized_comment.data)