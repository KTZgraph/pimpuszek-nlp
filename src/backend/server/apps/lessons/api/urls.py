from django.urls import path
from .views.lesson_file import LessonFileView
from .views.lesson_file_xlsx import LessonXlsxView, LessonXlsxToJsonView
from .views.lesson_dir import LessonDirView
from .views.lesson_notion import LessonNotionView

urlpatterns = [
    path("", LessonDirView.as_view()),
    path("files/", LessonFileView.as_view()),
    path("files/xlsx/", LessonXlsxView.as_view()),
    path("files/xlsx-json/", LessonXlsxToJsonView.as_view()),
    path("notion/", LessonNotionView.as_view()),
]
