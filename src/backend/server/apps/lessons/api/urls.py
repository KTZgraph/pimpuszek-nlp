from django.urls import path
from .views import LessonDirView, LessonFileView

urlpatterns = [
    path("", LessonDirView.as_view()),
    path("files/", LessonFileView.as_view()),
]
