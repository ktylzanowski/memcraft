from django.urls import path
from . import views

urlpatterns = [
    path("", views.MemeView.as_view(), name="MemeView"),
]
