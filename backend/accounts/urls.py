from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', views.RegisterView.as_view(), name="Register"),
    path('changepassword/', views.ChangePasswordView.as_view(), name="ChangePassword"),
    path('info/', views.UserView.as_view(), name="Userinfo"),
]