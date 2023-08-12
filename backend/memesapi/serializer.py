from rest_framework import serializers
from .models import Meme, Comment

class MemeSerializer(serializers.ModelSerializer):

    if_like = serializers.SerializerMethodField(read_only=True)
    if_dislike = serializers.SerializerMethodField(read_only=True)
    total_likes = serializers.SerializerMethodField(read_only=True)
    total_dislikes = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Meme
        fields = ['id', 'title', 'meme_image', 'author', 'total_likes', 'total_dislikes', 'if_like', 'if_dislike']
        extra_kwargs = {
            'likes': {'write_only': True},
            'dislikes': {'write_only': True},
        }
    
    def get_if_like(self, instance):
        user = self.context['user']
        return user in instance.likes.all()

    def get_if_dislike(self, instance):
        user = self.context['user']
        return user in instance.dislikes.all()

    def get_total_likes(self, instance):
        return instance.likes.count()

    def get_total_dislikes(self, instance):
        return instance.dislikes.count()


class CommentSerializer(serializers.ModelSerializer):
    author_icon = serializers.SerializerMethodField()
    author_username = serializers.SerializerMethodField()
    
    class Meta:
        model = Comment
        fields = ['id', 'text', 'author_icon', 'author_username']
        write_only = ['author', 'meme']

    def get_author_icon(self, obj):
        return obj.author.icon
    
    def get_author_username(self, obj):
        return obj.author.username