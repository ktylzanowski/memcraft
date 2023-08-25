from django.urls import path
from .views import MemeView, CommentView

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

user_meme_list = MemeView.as_view({
    'get': 'user_memes',
})

meme_draw = MemeView.as_view({
    'get': 'draw',
})
meme_like = MemeView.as_view({
    'post': 'like',
})

comment_list = CommentView.as_view({
    'get': 'list',
    'post': 'create',
})


urlpatterns = [
    path("", meme_draw, name="Root"),
    path('memes/', meme_list, name="Meme_list"),
    path('meme/<int:pk>/', meme_detail, name="Meme_detail"),
    path('memes/usermemes/', user_meme_list, name="User_meme_list"),
    path("like/", meme_like, name="like"),
    path('comment/', comment_list, name="Comment"),
]
