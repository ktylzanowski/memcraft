from rest_framework import serializers
from .models import *
from PIL import Image


class MemeSerializer(serializers.ModelSerializer):

    total_likes = serializers.SerializerMethodField()
    total_dislikes = serializers.SerializerMethodField()
    if_like = serializers.SerializerMethodField()
    if_dislike = serializers.SerializerMethodField()

    def __init__(self, *args, user=None, **kwargs):
        super().__init__(*args, **kwargs)
        self.user = user

    class Meta:
        model = Meme
        fields = ['id', 'title', 'meme_image', 'author', 'total_likes', 'total_dislikes', 'if_like', 'if_dislike']
        write_only = ['likes', 'dislikes']

    def get_total_likes(self, obj):
        return obj.total_likes()
    
    def get_total_dislikes(self, obj):
        return obj.total_dislikes()
    
    def get_if_like(self, obj):
        return True if self.context['user'] in obj.likes.all() else False
    
    def get_if_dislike(self, obj):
        return True if self.context['user'] in obj.dislikes.all() else False

    def validate_meme_image(self, value):
        try:
            image = Image.open(value)
            image.verify()
        except Exception as e:
            raise serializers.ValidationError("To nie jest obraz lub gif.")

        allowed_extensions = [".jpg", ".jpeg", ".png", ".gif"]
        if not value.name.lower().endswith(tuple(allowed_extensions)):
            raise serializers.ValidationError(
                "Dozwolone są tylko pliki w formacie JPG, JPEG, PNG lub GIF."
            )

        return value
    
class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = "__all__"
