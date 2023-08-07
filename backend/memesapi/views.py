from .models import *
from .serializer import *
from random import choice
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes
from rest_framework import status
from django.shortcuts import get_object_or_404


class MemeView(APIView):
    def get(self, request):
        meme_id = request.META.get("HTTP_MEME_ID")
        if meme_id:
            memes = Meme.objects.exclude(id=meme_id)
        else:
            memes = Meme.objects.all()
        meme = choice(memes)
        if meme:
            serializer = MemeSerializer(meme, context={'user': request.user})
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

    @permission_classes([IsAuthenticated])
    def post(self, request):
        user = request.user
        data = {
            "title": request.data.get("title"),
            "meme_image": request.FILES.get("image"),
            "author": user.pk,
        }
        serializer = MemeSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Mem dodany."}, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LikesView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
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
        serializer.save(author=request.user, meme=meme)

        return Response({"message": "Comment added successfully"})