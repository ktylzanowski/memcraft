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
        meme_id = request.META.get('HTTP_MEME_ID')
        memes = Meme.objects.exclude(id=meme_id)
        meme = choice(memes) if memes else None
        if meme:
            serializer = MemeSerializer(meme)
            return Response(serializer.data)
        else:
            return Response({'message': 'Nie udało się złapać mema.'}, status=status.HTTP_404_NOT_FOUND)
        
    @permission_classes([IsAuthenticated])
    def post(self, request):
        user = request.user
        data = {'title': request.data.get('title'), 'meme_image': request.FILES.get('image'), 'author': user.pk}
        serializer = MemeSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Meme created successfully.'}, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)