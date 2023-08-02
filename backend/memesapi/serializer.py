from rest_framework import serializers
from . models import *

class MemeSerializer(serializers.ModelSerializer):

    class Meta:
        model = Meme
        fields = '__all__'
        