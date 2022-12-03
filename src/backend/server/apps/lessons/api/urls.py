from django.urls import path
from .views.lesson_file import LessonFileView
from .views.lesson_file_xlsx import LessonXlsxView, LessonXlsxToJsonView
from .views.lesson_dir import LessonDirView
from .views.lesson_notion import LessonNotionView
from .views.lesson_notion_quiz import LessonNotionQuizView
from .views.lesson_notion_quiz_data import LessonNotionQuizDataView

urlpatterns = [
    path("", LessonDirView.as_view()),
    path("files/", LessonFileView.as_view()),
    path("files/xlsx/", LessonXlsxView.as_view()),
    path("files/xlsx-json/", LessonXlsxToJsonView.as_view()),
    path("notion/", LessonNotionView.as_view()),
    # http://127.0.0.1:8000/api/lessons/notion-quiz/
    path("notion-quiz/", LessonNotionQuizView.as_view()),
    path("notion-quiz-data/", LessonNotionQuizDataView.as_view()),
]
