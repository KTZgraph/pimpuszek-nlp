from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions

from server.settings import MEDIA_ROOT
import os


from ...models import LessonDir
from ..serializers.lesson_dir import LessonDirSerializer


QUIZZES_FOLDER_NAME = "quizzes"


class LessonDirView(APIView):
    """Tworzenie i podgląd lekcji - folderów"""

    def get(self, request):
        """Zwraca liste lekcji"""
        lesson_dir_list = LessonDir.objects.all()
        response = [str(i) for i in lesson_dir_list]

        lesson_dir_data = LessonDirSerializer(lesson_dir_list, many=True)

        return Response(
            {
                "message": f"lista folderow które są lekcjami {response}",
                "data": lesson_dir_data.data,
            },
            status=status.HTTP_200_OK,
        )

    def post(self, request):
        """Tworzy nowy folder który jest lekcją

        http://localhost:8000/api/lessons/create/
        {
            "name": "lekcja 1",
            "number": 1,
            "class_date": "2022-12-16",
            "title": "tytul lekcji 1",
            "description": "jakis opis lekcji"
        }
        """
        data = request.data
        name = data["name"]
        number = data["number"]
        class_date = data["class_date"]
        title = data["title"]
        description = data["description"]

        lesson_dir_name = f"lesson_{number}"
        lesson_dir_path = os.path.join(MEDIA_ROOT, lesson_dir_name)
        lesson_quizz_dir_path = os.path.join(
            MEDIA_ROOT, lesson_dir_name, QUIZZES_FOLDER_NAME
        )

        try:
            lesson_dir_obj = LessonDir.objects.create(
                name=name,
                dir_name=lesson_dir_name,
                number=int(number),
                class_date=class_date,
                title=title,
                description=description,
                path=lesson_dir_path,
            )
            lesson_dir_obj.save()

            os.makedirs(lesson_dir_path)
            # folder do quizów
            os.makedirs(lesson_quizz_dir_path)

        except OSError as e:
            if e.errno == 17:
                return Response(
                    {
                        "error": f"folder: {lesson_dir_path} już istenije",
                        "details": str(e),
                    },
                    status=status.HTTP_400_BAD_REQUEST,
                )
        except Exception as e:
            return Response(
                {
                    "error": f"nie udało się utworzyć folder:{lesson_dir_name}",
                    "details": str(e),
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        return Response(
            {"message": f"utworzono nowy folder który jest lekcją w {lesson_dir_path}"},
            status=status.HTTP_201_CREATED,
        )
