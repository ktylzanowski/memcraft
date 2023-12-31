from django.db import models
from django.conf import settings

def upload_path(instance, filename):
    return "/".join(["images", filename])


class Meme(models.Model):
    title = models.CharField(
        max_length=20,
        blank=False,
        null=False,
    )
    meme_image = models.ImageField(
        blank=False,
        null=False,
        upload_to=upload_path,
    )

    author = models.ForeignKey(
        settings.AUTH_USER_MODEL, null=False, blank=False, on_delete=models.CASCADE
    )
    created_at = models.DateTimeField(auto_now_add=True)
    if_accepted = models.BooleanField(null=False, blank=False, default=False)

    likes = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='meme_likes', blank=True)
    dislikes = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='meme_dislikes', blank=True)

    def delete(self, *args, **kwargs):
        Notification.objects.filter(meme=self).delete()
        Comment.objects.filter(meme=self).delete()
        self.meme_image.delete()
        super(Meme, self).delete(*args, **kwargs)

    def total_likes(self):
        return self.likes.count()

    def total_dislikes(self):
        return self.dislikes.count()
    
    def total_comments(self):
        return self.comments.count()
    
    class Meta:
        ordering = ['-pk']

    def __str__(self):
        return str(self.title) + str(self.pk)


class Comment(models.Model):
    meme = models.ForeignKey(Meme, related_name="comments", on_delete=models.CASCADE, null=False)
    author = models.ForeignKey(settings.AUTH_USER_MODEL, related_name="comment_author", on_delete=models.CASCADE, null=False)
    text = models.CharField(max_length=100, blank=False, null=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-pk']  

    def __str__(self):
        return str(self.meme.title) + str(self.pk)

class Notification(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    meme = models.ForeignKey(Meme, on_delete=models.CASCADE)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)
    notification_type = models.CharField(max_length=20)
    
    @classmethod
    def create_like_notification(cls, meme):
        total_likes = meme.total_likes()
        notification, created = cls.objects.get_or_create(
            meme=meme,
            user=meme.author,
            notification_type='like',
        )
        if total_likes == 1:
            notification.content = f"Jedna osoba polubiła twój mem {meme.title}."
        elif total_likes == 2 or total_likes == 3 or total_likes == 4:
            notification.content = f"{total_likes} osoby polubiły twój mem \"{meme.title}\"."
        else:
            notification.content = f"{total_likes} osób niepolubiło twój mem \"{meme.title}\"."
        notification.is_read = False
        notification.save()


    @classmethod
    def create_comment_notification(cls, meme):
        total_comments = meme.total_comments()
        notification, created = cls.objects.get_or_create(
            meme=meme,
            user=meme.author,
            notification_type='comment',
        )
        if total_comments == 1:
            notification.content = f"Jedna osoba skomentowała twój mem {meme.title}."
        elif total_comments == 2 or total_comments == 3 or total_comments == 4:
            notification.content = f"{total_comments} osoby skomentowały twój mem \"{meme.title}\"."
        else:
            notification.content = f"{total_comments} osób skomentowało twój mem \"{meme.title}\"."
        notification.is_read = False
        notification.save()

    def __str__(self):
        return str(self.meme.title)
    
    class Meta:
        ordering = ['-created_at']