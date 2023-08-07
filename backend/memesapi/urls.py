from django.urls import path
from . import views

urlpatterns = [
    path("", views.MemeView.as_view(), name="MemeView"),
    path("likes", views.LikesView.as_view(), name="Likes"),
    path('addcomment', views.CommentView.as_view(), name="AddComment"),
]
