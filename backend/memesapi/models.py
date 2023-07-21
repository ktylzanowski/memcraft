from django.db import models

def upload_path(instance, filename):
    return '/'.join(['images', str(instance.title), filename])

class Meme(models.Model):
    title = models.CharField(max_length=20, null=True)
    meme_image = models.ImageField(null=True, blank=True, upload_to=upload_path)
    if_accepted = models.BooleanField(null = True, default=False)

    def __str__(self):
        return str(self.pk)