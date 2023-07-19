from django.db import models

class Meme(models.Model):
    title = models.CharField(max_length=20, null=True)
    meme_image = models.ImageField(null=True, blank=True, upload_to="images/")
    if_accepted = models.BooleanField(null = True, default=False)

    def __str__(self):
        return str(self.pk)