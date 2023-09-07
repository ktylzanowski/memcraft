from django.urls import path
from .views import MemeView, CommentView, NotificationView

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
meme_user_likes = MemeView.as_view({
    'get': 'user_likes_memes'
})
meme_user_dislikes = MemeView.as_view({
    'get': 'user_dislikes_memes'
})
meme_like = MemeView.as_view({
    'post': 'like',
})

comment_list = CommentView.as_view({
    'get': 'list',
    'post': 'create',
})
comment_detail = CommentView.as_view({
    'get': 'retrieve',
    'delete': 'destroy',
})
user_comments = CommentView.as_view({
    'get': 'user_comments',
})

notification_list = NotificationView.as_view({
    'get': 'list',
})
notification_markup = NotificationView.as_view({
    'get': 'mark_all_as_read'
})


urlpatterns = [
    path("", meme_draw, name="Root"),
    path('memes/', meme_list, name="Meme_list"),
    path('meme/<int:pk>/', meme_detail, name="Meme_detail"),
    path('memes/usermemes/', user_meme_list, name="User_meme_list"),
    path('memes/user/likes/', meme_user_likes, name="Meme_user_likes"),
    path('memes/user/dislikes/', meme_user_dislikes, name="Meme_user_dislikes"),
    path("like/", meme_like, name="like"),
    path('comment/', comment_list, name="Comment"),
    path('comment/<int:pk>/', comment_detail, name="Comment_detail"),
    path('comment/user/', user_comments, name="User_comments"),
    path('notification/', notification_list, name="Notification"),
    path('notification/read/', notification_markup, name="NotificationMarkUp"),
]
