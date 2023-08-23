from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenRefreshView

user = views.UserViewSet.as_view({
    'get': 'get',
    'post': 'create',
})
user_change_password = views.UserViewSet.as_view({
    'put': 'change_password',
})
user_update_info = views.UserViewSet.as_view({
    'patch': 'update',
})


urlpatterns = [
    path("token/", views.MyTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("user/", user, name="User"),
    path("changepassword/", user_change_password, name="ChangePassword"),
    path("userinfo/", user_update_info, name="Userinfo"),
]
