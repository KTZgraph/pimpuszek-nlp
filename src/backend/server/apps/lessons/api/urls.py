from django.urls import path
from .views import LessonDirListView, LessonDirCreateView

urlpatterns = [
    path("", LessonDirListView.as_view()),
    path("create/", LessonDirCreateView.as_view()),
]
