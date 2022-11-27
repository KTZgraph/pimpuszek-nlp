from django.db import models
from django.utils.timezone import now
import os


class LessonDir(models.Model):
    name = models.CharField(max_length=400)
    dir_name = models.CharField(max_length=100, unique=True, null=False)
    number = models.IntegerField(null=False, unique=True)
    # data zajęć które się odbyły
    class_date = models.DateField(null=False, unique=False)
    # tytuł lekcji może się powtórzyć, bo np jeden temat robimy przez dwa zajecia
    title = models.CharField(max_length=400, null=False, default="")
    # https://stackoverflow.com/questions/60674719/django-which-model-field-for-dir-path
    path = models.FilePathField(allow_folders=True, recursive=True)
    description = models.TextField(max_length=1000, null=True)
    date_created = models.DateTimeField(default=now)

    def __str__(self) -> str:
        if "\\" in self.path:
            # ścieżka na windows
            return str(self.path.split("\\")[-1])

        # ścieżka na Linux
        return str(self.path.split("/")[-1])


def lesson_file_upload(instance, filename):
    lesson_dir = instance.lesson_dir
    upload_to = os.path.join(lesson_dir.path, f"{filename}")
    return upload_to


class LessonFile(models.Model):
    # jeden do wielu - jedne folder lekcji zawiera wiele plików; ale plik jest w jednej lekcji
    lesson_dir = models.ForeignKey(LessonDir, on_delete=models.CASCADE)
    # lesson_file = models.FileField(upload_to="lessons/")
    # WARNING customowa ściezka do uploadu plików
    filename = models.TextField(unique=False, null=False)
    lesson_file = models.FileField(upload_to=lesson_file_upload)
    date_created = models.DateTimeField(default=now)

    def __str__(self) -> str:
        return str(self.filename)
