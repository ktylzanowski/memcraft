from .models import *
from .serializer import *
from random import choice
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializer import RegisterSerializer

class MemeView(APIView):

    def get(self, request):
        meme_id = request.META.get('HTTP_MEME_ID')
        memes = Meme.objects.exclude(id=meme_id)
        meme = choice(memes)
        serializer = MemeSerializer(meme)
        return Response(serializer.data)
    


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class RegisterView(APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        data = {}
        if serializer.is_valid():
            user = serializer.save()
            data['response'] = "Poprawna Rejestracja"
        else:
            data = serializer.errors
        return Response(data)