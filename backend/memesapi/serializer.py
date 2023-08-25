from rest_framework import serializers
from .models import Meme, Comment

class MemeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Meme
        fields = ['id', 'title', 'meme_image', 'author', 'author_name', 'total_likes', 'total_dislikes', 'if_like', 'if_dislike', 'total_comments']
        read_only = ['author_name']
        extra_kwargs = {
            'likes': {'write_only': True},
            'dislikes': {'write_only': True},
            "title": {"error_messages": {'null': "Tytuł nie może być pusty", 'blank': "Tytuł nie może być pusty"}},
            "meme_image": {"error_messages": {'invalid_image': "Wysłany plik nie jest prawidłowym obrazem. Proszę przesłać poprawny obraz.", 
                                              'null': "Musisz przesłać jakieś zdjęcie",
                                              'blank': "Musisz przesłać jakieś zdjęcie",}},
        }

    if_like = serializers.SerializerMethodField(read_only=True)
    if_dislike = serializers.SerializerMethodField(read_only=True)
    total_likes = serializers.SerializerMethodField(read_only=True)
    total_dislikes = serializers.SerializerMethodField(read_only=True)
    author_name = serializers.SerializerMethodField(read_only=True)
    total_comments = serializers.SerializerMethodField(read_only=True)
    
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

    def get_total_comments(self, instance):
        return len(Comment.objects.filter(meme=instance))

class CommentSerializer(serializers.ModelSerializer):
    author_icon = serializers.SerializerMethodField()
    author_username = serializers.SerializerMethodField()
    meme_id = serializers.SerializerMethodField()

    
    class Meta:
        model = Comment
        fields = ['id', 'text', 'author_icon', 'author_username', 'meme_id']
        write_only = ['author', 'meme']
        extra_kwargs ={
            "text": {"error_messages": {'null': "Komentarz nie może być pusty", 'blank': "Komentarz nie może być pusty"}},
        }

    def get_meme_id(self, obj):
        return obj.meme.id

    def get_author_icon(self, obj):
        return obj.author.icon
    
    def get_author_username(self, obj):
        return obj.author.username