from .models import *
from .serializer import *
from random import choice
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from django.shortcuts import get_object_or_404
from rest_framework.decorators import action
from rest_framework import permissions
from rest_framework import viewsets
from rest_framework.renderers import JSONRenderer


class MemeView(viewsets.ModelViewSet):
    queryset = Meme.objects.all()
    serializer_class = MemeSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

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
            serializer.save()
            return Response({"message": "Mem dodany."}, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, renderer_classes=[JSONRenderer])
    def draw(self, request):
        meme_id = request.META.get("HTTP_MEME_ID")
        memes = self.queryset.exclude(id=meme_id) if meme_id else self.queryset
        if memes.exists():
            meme = choice(memes)
            serializer = self.get_serializer(meme)
            commnets = Comment.objects.filter(meme=meme)
            serializer_comments = CommentSerializer(commnets, many=True)
            return Response({
            'meme': serializer.data,
            'comments': serializer_comments.data,
            })
        else:
            return Response(
                {"message": "Nie udało się złapać mema."},
                status=status.HTTP_404_NOT_FOUND,
            )

    @action(detail=True, renderer_classes=[JSONRenderer])
    def like(self, request):
        try:
            meme_id = request.data.get('id')
            meme = Meme.objects.get(pk=meme_id)
            
            action = request.data.get('action')
            if action not in ['like', 'dislike']:
                return Response({'error': 'Nieprawidłowa akcja.'}, status=status.HTTP_400_BAD_REQUEST)

            if action == "like":
                meme.likes.set([request.user])
                meme.dislikes.remove(request.user)
            elif action == "dislike":
                meme.dislikes.set([request.user])
                meme.likes.remove(request.user)

            total_likes = meme.total_likes()
            total_dislikes = meme.total_dislikes()
            response_data = {
                'total_likes': total_likes,
                'total_dislikes': total_dislikes
            }
            return Response(response_data, status=status.HTTP_200_OK)
        except Meme.DoesNotExist:
            return Response({'error': 'Mem nie znaleziony.'}, status=status.HTTP_404_NOT_FOUND)
        
class CommentView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        data = request.data
        meme_id = data.get('meme_id')
        meme = get_object_or_404(Meme, pk=meme_id)
        serializer = CommentSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        comment = serializer.save(author=request.user, meme=meme)
        serialized_comment = CommentSerializer(comment)
        return Response({
            "message": "Komentarz dodany",
            "comment": serialized_comment.data
        })