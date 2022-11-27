from django.db import models
from django.utils.timezone import now
import os


class LessonDir(models.Model):
    name = models.CharField(max_length=400)
    number = models.IntegerField(null=False, unique=True)
    # data zajęć które się odbyły
    class_date = models.DateField(null=False, unique=False)
    # tytuł lekcji może się powtórzyć, bo np jeden temat robimy przez dwa zajecia
    title = models.CharField(max_length=400, null=False, default="")
    # https://stackoverflow.com/questions/60674719/django-which-model-field-for-dir-path
    path = models.FilePathField(allow_folders=True, recursive=True)
    description = models.TextField(max_length=1000, null=True)
    date_created = models.DateTimeField(default=now)
