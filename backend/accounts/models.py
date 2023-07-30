from django.db import models
from django.contrib.auth.models import (
    BaseUserManager, AbstractBaseUser
)


class MyUserManager(BaseUserManager):
    def create_user(self, username, email, password=None):

        if not email:
            raise ValueError('Użytkownik musi mieć email')
        
        if not username:
            raise ValueError("Użytkownik musi mieć nickname")

        user = self.model(
            email=self.normalize_email(email),
            username=username,
        )
        
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, email, password=None):
        user = self.create_user(
            username,
            email,
            password=password,
        )
        user.is_admin = True
        user.is_staff = True
        user.save(using=self._db)
        return user


class MyUser(AbstractBaseUser):
    username = models.CharField(max_length=20, unique=True, verbose_name="nick name")
    email = models.EmailField(
        verbose_name='email address',
        max_length=255,
        unique=True,
    )
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)

    first_name = models.CharField(max_length=255, null=True, blank=True)
    last_name = models.CharField(max_length=255, null=True, blank=True)
    phone = models.CharField(max_length=12, null=True, blank=True)
    city = models.CharField(max_length=255, null=True, blank=True)
    zip_code = models.CharField(max_length=10, null=True, blank=True)
    street = models.CharField(max_length=255, null=True, blank=True)
    building_number = models.CharField(max_length=10, null=True, blank=True)
    apartment_number = models.CharField(max_length=10, null=True, blank=True)

    icon = models.CharField(default='icons/creeperface.png', max_length=50)

    objects = MyUserManager()
    
    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email']

    def __str__(self):
        return self.username

    def has_perm(self, perm, obj=None):
        return True

    def has_module_perms(self, app_label):
        return True