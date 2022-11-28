from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from django.core.files.base import ContentFile  # ensure you import

import os
import json
import ast

# FIXME - docelowo token do NOTION z bazy usera
from server.settings import MEDIA_ROOT, notion_env

from ...models import LessonFileNotion, LessonDir

from ...helpers.notion_database import save_notion_db_as_json


def dict_to_byte_like_object(data_dict: dict):
    """
    Potrzebne do zapisu pliku do bazy dancyh
    https://www.folkstalk.com/2022/10/dict-to-bytes-python-with-code-examples.html"""


class LessonNotionView(APIView):
    def get(self, request):
        try:
            lesson_name = request.query_params.get("lesson")
            if lesson_name:
                notion_file_list = LessonFileNotion.objects.filter(
                    lesson_dir__dir_name=lesson_name
                )

                return Response(
                    f"Pliki notion dla lekcji {lesson_name} to {[str(i) for i in notion_file_list]}",
                    status=status.HTTP_200_OK,
                )

            response = {}
            lesson_dir_list = LessonDir.objects.all()

            for lesson_dir in lesson_dir_list:
                response[lesson_dir.dir_name] = [
                    i.filename
                    for i in LessonFileNotion.objects.filter(lesson_dir=lesson_dir)
                ]

            return Response(
                response,
                status=status.HTTP_200_OK,
            )
        except Exception as e:
            return Response(
                {"details": str(e)},
                status=status.HTTP_400_BAD_REQUEST,
            )

    def post(self, request):
        """WARNING - pamietać o uprawnieniach do pliku"""
        try:
            lesson_name = request.data.get("lesson_name")
            notion_url = request.data.get("notion_url")
            notion_filename = request.data.get("notion_filename")

            # paramaetry do zrobienia quizu
            question_column = request.data.get("question_column")
            answer_column = request.data.get("answer_column")
            type_column = request.data.get("type_column")

            if not (lesson_name and notion_url and notion_filename):
                return Response(
                    {
                        "error": "Nie podano wymaganych paramaterów: lesson_name, notion_url, notion_filename"
                    },
                    status=status.HTTP_400_BAD_REQUEST,
                )

            if not (question_column and answer_column and type_column):
                # FIXME - sprawdzania czy te pola występują rzeczywiście w pliku i nie sa to puste kolumny
                return Response(
                    {
                        "error": "Nie podano wymaganych paramaterów: question_column and answer_column and type_column do stworzenia quizu na froncie"
                    },
                    status=status.HTTP_400_BAD_REQUEST,
                )

            lesson_dir = LessonDir.objects.filter(dir_name=lesson_name)
            if not lesson_dir.exists():
                return Response(
                    {
                        "error": f"Folder będący lekcją o tej naziwe {lesson_dir} NIE istnieje"
                    },
                    status=status.HTTP_400_BAD_REQUEST,
                )

            # FIXME - docelowo token do notion z bazy usera
            try:
                data_notion = save_notion_db_as_json(
                    notion_url, notion_env("NOTION_TOKEN")
                )
            except Exception as e:
                return Response(
                    {
                        "error": f"Nie udało się pobrac bazy z notion: {notion_url}",
                        "details": str(e),
                    },
                    status=status.HTTP_400_BAD_REQUEST,
                )

            try:
                # tworzenie pliku w bazie
                notion_filename_json = f"{notion_filename.split('.')[0]}.json"
                # notion_file_path = os.path.join(MEDIA_ROOT, lesson_dir[0]__dir_name, notion_file_json)
                lesson_dir_name = lesson_dir[0].dir_name
                notion_file_path = os.path.join(
                    MEDIA_ROOT, lesson_dir_name, notion_filename_json
                )

                # zapisywanie fizyczne pliku
                with open(notion_file_path, "w", encoding="utf-8") as f:
                    json.dump(data_notion["data"], f, ensure_ascii=False)

            except Exception as e:
                return Response(
                    {
                        "error": f"Nie udało się zapisać pliku z danymi z notion",
                        "details": str(e),
                    },
                    status=status.HTTP_400_BAD_REQUEST,
                )

            try:
                lesson_file_notion = LessonFileNotion.objects.create(
                    lesson_dir=lesson_dir[0],
                    filename=notion_filename_json,
                    notion_url=notion_url,
                    notion_created_at=data_notion["metadata"].get(
                        "notion_created_at", ""
                    ),
                    notion_modified_at=data_notion["metadata"].get(
                        "notion_modified_at", ""
                    ),
                    notion_title=data_notion["metadata"].get("notion_title"),
                    question_column=question_column,
                    answer_column=answer_column,
                    type_column=type_column,
                    # WARNING - ja NIE chcę zapisywać pliku do bazy, tylko chcę mieć jego ścieżkę
                    filepath=notion_file_path,
                )

                # WARNING - ja NIE chcę zapisywać pliku do bazy, tylko chcę mieć jego ścieżkę
                lesson_file_notion.save()

            except Exception as e:
                return Response(
                    {
                        "error": f"Nie udało się zapisać DO BAZY danych",
                        "details": str(e),
                    },
                    status=status.HTTP_400_BAD_REQUEST,
                )

        except Exception as e:
            return Response(
                {
                    "details": str(e),
                },
                status=status.HTTP_200_OK,
            )

        return Response(
            {
                "new file": "na końcu pliku",
            },
            status=status.HTTP_200_OK,
        )
