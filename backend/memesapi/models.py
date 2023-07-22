from django.db import models
from django.contrib.auth.models import User

def upload_path(instance, filename):
    return '/'.join(['images', filename])

class Meme(models.Model):
    title = models.CharField(max_length=20, null=False, blank=False, default="Meme")
    meme_image = models.ImageField(null=False, blank=False, upload_to=upload_path)
    author = models.ForeignKey(User, null=False, blank=False, on_delete=models.CASCADE)
    if_accepted = models.BooleanField(null=False, blank=False, default=False)

    def __str__(self):
        return str(self.title)+str(self.pk)