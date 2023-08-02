from rest_framework import serializers
from . models import *
from PIL import Image
from io import BytesIO

class MemeSerializer(serializers.ModelSerializer):

    class Meta:
        model = Meme
        fields = ['pk', 'title', 'meme_image', 'author', 'if_accepted']

    def validate_meme_image(self, value):
        try:
            image = Image.open(value)
            image.verify()
        except Exception as e:
            raise serializers.ValidationError('To nie jest obraz lub gif.')
        
        allowed_extensions = ['.jpg', '.jpeg', '.png', '.gif']
        if not value.name.lower().endswith(tuple(allowed_extensions)):
            raise serializers.ValidationError('Dozwolone są tylko pliki w formacie JPG, JPEG, PNG lub GIF.')

        return value