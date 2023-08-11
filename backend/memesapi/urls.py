from django.urls import path
from . import views
from .views import MemeView

meme_list = MemeView.as_view({
    'get': 'list',
    'post': 'create',
})
meme_detail = MemeView.as_view({
    'get': 'retrieve',
    'put': 'update',
    'patch': 'partial_update',
    'delete': 'destroy',
})

meme_draw = MemeView.as_view({
    'get': 'draw',
})
meme_like = MemeView.as_view({
    'post': 'like',
})


urlpatterns = [
    path("", meme_draw, name="Root"),
    path('memes/', meme_list, name="Meme_list"),
    path('meme/<int:pk>/', meme_detail, name="Meme_detail"),
    path("like/", meme_like, name="like"),
    path('addcomment', views.CommentView.as_view(), name="AddComment"),
]
