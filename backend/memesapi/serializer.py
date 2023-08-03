from rest_framework import serializers
from .models import *
from PIL import Image


class MemeSerializer(serializers.ModelSerializer):

    total_likes = serializers.SerializerMethodField()

    class Meta:
        model = Meme
        fields = '__all__'

    def get_total_likes(self, obj):
        return obj.total_likes()

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
