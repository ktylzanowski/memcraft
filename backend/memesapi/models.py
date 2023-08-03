from django.db import models
from django.conf import settings

def upload_path(instance, filename):
    return "/".join(["images", filename])


class Meme(models.Model):
    title = models.CharField(
        max_length=20,
        null=False,
        blank=False,
        error_messages={
            "null": 'Pole "tytuł" nie może być puste.',
            "blank": 'Pole "tytuł" nie może być puste.',
        },
    )
    meme_image = models.ImageField(
        null=False,
        blank=False,
        upload_to=upload_path,
        error_messages={
            "null": 'Pole "zdjęcie" nie może być puste.',
            "blank": 'Pole "zdjęcie" nie może być puste.',
        },
    )

    author = models.ForeignKey(
        settings.AUTH_USER_MODEL, null=False, blank=False, on_delete=models.CASCADE
    )

    if_accepted = models.BooleanField(null=False, blank=False, default=False)

    likes = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='meme_likes', blank=True)

    def total_likes(self):
        return self.likes.count()


    def __str__(self):
        return str(self.title) + str(self.pk)
    