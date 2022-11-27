from django.urls import path
from .views import LessonListView, LessonCreateView

urlpatterns = [
    path("", LessonListView.as_view()),
    path("create/", LessonCreateView.as_view()),
]
