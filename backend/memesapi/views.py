from .models import *
from .serializer import *
from random import choice
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializer import RegisterSerializer
from rest_framework.permissions import BasePermission

class IsAuthenticatedOrReadonly(BasePermission):
    def has_permission(self, request, view):
        if request.method == 'GET':
            return True
        return request.user and request.user.is_authenticated

class MemeView(APIView):

    permission_classes = [IsAuthenticatedOrReadonly]

    def get(self, request):
        meme_id = request.META.get('HTTP_MEME_ID')
        memes = Meme.objects.exclude(id=meme_id)
        meme = choice(memes)
        serializer = MemeSerializer(meme)
        return Response(serializer.data)
    
    def post(self, request):
        auth_header = request.headers.get('Authorization')
        if auth_header and auth_header.startswith('Bearer '):
            token = auth_header[len('Bearer '):]
        
        data = {'title': request.data['title'], 'meme_image': request.FILES['image'], 'author': token}
        serializer = MemeSerializer(data = data)
        response = {}
        if serializer.is_valid():
            meme = serializer.save()
            response['response'] = "OK"
        else: 
            response['response'] = "BAD"
        return Response(response)

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