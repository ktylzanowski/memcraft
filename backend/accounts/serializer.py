from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import check_password

MyUser = get_user_model()


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token["username"] = user.username
        token["icon"] = user.icon
        return token


class RegisterSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(style={"input_type": "password"}, write_only=True, error_messages={
            'blank': "Hasło nie może być puste",
        })

    class Meta:
        model = MyUser
        fields = ["email", "username", "password", "password2"]
        extra_kwargs = {
            "email": {"error_messages": {'blank': "Email nie może być pusty", 'required': "To pole jest wymagane",  
                                         'max_length': "Tytuł jest zbyt długi. Maksymalna długość to 255 znaków."}},
            "username": {"error_messages": {'blank': "Nazwa użytkownika nie może być pusta", 'required': "To pole jest wymagane",
                                             'max_length': "Tytuł jest zbyt długi. Maksymalna długość to 20 znaków."}},
            "password": {"write_only": True, "error_messages": {'required': "To pole jest wymagane"}}
        }

    def validate_password2(self, value):
        if self.initial_data.get('password') != value:
            raise serializers.ValidationError("Hasła nie są takie same!")
        return value

    def create(self, validated_data):
        user = MyUser(
            email=validated_data["email"],
            username=validated_data["username"],
        )
        user.set_password(validated_data["password"])
        user.save()
        return user


class ChangePasswordSerializer(serializers.ModelSerializer):
    old_password = serializers.CharField(style={"input_type": "password"}, error_messages= {'blank': "To pole jest wymagane"})
    new_password = serializers.CharField(style={"input_type": "password"}, error_messages= {'blank': "To pole jest wymagane"})
    new_password2 = serializers.CharField(style={"input_type": "password"}, error_messages= {'blank': "To pole jest wymagane"})

    class Meta:
        model = MyUser
        fields = ["old_password", "new_password", "new_password2"]

    def validate_old_password(self, value):
        if not check_password(value, self.instance.password):
            raise serializers.ValidationError("Złe hasło.")
        return value

    def validate(self, data):
        if data["new_password"] != data["new_password2"]:
            raise serializers.ValidationError("Hasła nie są takie same.")
        return data

    def update(self, instance, validated_data):
        instance.set_password(validated_data["new_password"])
        instance.save()
        return instance

class UserInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = MyUser
        fields = [
            "first_name",
            "last_name",
            "phone",
            "city",
            "zip_code",
            "street",
            "building_number",
            "apartment_number",
            "icon",
        ]