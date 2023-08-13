from rest_framework import serializers
from .models import Meme, Comment

class MemeSerializer(serializers.ModelSerializer):

    if_like = serializers.SerializerMethodField(read_only=True)
    if_dislike = serializers.SerializerMethodField(read_only=True)
    total_likes = serializers.SerializerMethodField(read_only=True)
    total_dislikes = serializers.SerializerMethodField(read_only=True)
    author_name = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Meme
        fields = ['id', 'title', 'meme_image', 'author', 'author_name', 'total_likes', 'total_dislikes', 'if_like', 'if_dislike']
        read_only = ['author_name']
        extra_kwargs = {
            'likes': {'write_only': True},
            'dislikes': {'write_only': True},
        }

    def validate_title(self, value):
        if not value:
            raise serializers.ValidationError("Tytuł nie może być pusty")
        return value
    
    def validate_meme_image(self, value):
        if value is None:
            raise serializers.ValidationError("Trzeba przesłać zdjęcie")
        return value
    
    
    def get_author_name(self, instance):
        return instance.author.username

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
    meme_id = serializers.SerializerMethodField()
    
    class Meta:
        model = Comment
        fields = ['id', 'text', 'author_icon', 'author_username', 'meme_id']
        write_only = ['author', 'meme']

    def get_meme_id(self, obj):
        return obj.meme.id

    def get_author_icon(self, obj):
        return obj.author.icon
    
    def get_author_username(self, obj):
        return obj.author.username