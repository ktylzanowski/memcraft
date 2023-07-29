from .models import *
from .serializer import *
from random import choice
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated
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
    
class UserView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        user = request.user
        serializer = UserInfoSerializer(user)
        return Response(serializer.data)
    
    def post(self, request):
        user = request.user
        request.data['pk'] = user.pk
        serializer = UserInfoSerializer(data=request.data)
        response = {}
        if serializer.is_valid():
            serializer.save()
            response['response'] = 'OK'
        else:
            response['response'] = 'BAD'
        return Response(response)