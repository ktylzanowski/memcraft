from django.db import models
from django.conf import settings

def upload_path(instance, filename):
    return "/".join(["images", filename])


class Meme(models.Model):
    title = models.CharField(
        max_length=20,
        blank=True,
    )
    meme_image = models.ImageField(
        blank=True,
        null=True,
        upload_to=upload_path,
    )

    author = models.ForeignKey(
        settings.AUTH_USER_MODEL, null=False, blank=False, on_delete=models.CASCADE
    )

    if_accepted = models.BooleanField(null=False, blank=False, default=False)

    likes = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='meme_likes', blank=True)
    dislikes = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='meme_dislikes', blank=True)

    def total_likes(self):
        return self.likes.count()

    def total_dislikes(self):
        return self.dislikes.count()

    def __str__(self):
        return str(self.title) + str(self.pk)


class Comment(models.Model):
    meme = models.ForeignKey(Meme, related_name="comments", on_delete=models.CASCADE, null=False)
    author = models.ForeignKey(settings.AUTH_USER_MODEL, related_name="comment_author", on_delete=models.CASCADE, null=False)
    text = models.CharField(max_length=100, blank=False, null=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.meme.title) + str(self.pk)
