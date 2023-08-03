from .models import *
from .serializer import *
from random import choice
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes
from rest_framework import status


class MemeView(APIView):
    def get(self, request):
        meme_id = request.META.get("HTTP_MEME_ID")
        if meme_id:
            memes = Meme.objects.exclude(id=meme_id)
        else:
            memes = Meme.objects.all()
        meme = choice(memes)

        if meme:
            serializer = MemeSerializer(meme)
            return Response(serializer.data)
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
    @permission_classes([IsAuthenticated])
    def post(self, request):
        try:
            mem = Meme.objects.get(pk=request.data['id'])
            if request.data['action'] == "like":
                mem.likes.add(request.user)
                mem.dislikes.remove(request.user)
            elif request.data['action'] == "dislike":
                mem.dislikes.add(request.user)
                mem.likes.remove(request.user)
            total_likes = mem.total_likes()
            total_dislikes = mem.total_dislikes()
            response_data = {
                'total_likes': total_likes,
                'total_dislikes': total_dislikes
            }
            return Response(response_data)
        except Meme.DoesNotExist:
            return Response({'error': 'Zdjecie not found.'}, status=status.HTTP_404_NOT_FOUND)