from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions

from server.settings import MEDIA_ROOT
import os


from ..models import LessonDir


class LessonDirListView(APIView):
    def get(self, request):
        lesson_dir_list = LessonDir.objects.all()
        response = [str(i) for i in lesson_dir_list]

        return Response(
            f"lista folderow które są lekcjami {response}",
            status=status.HTTP_200_OK,
        )


class LessonDirCreateView(APIView):
    """Tworzy nowy folder który jest lekcją"""

    def post(self, request):
        """http://localhost:8000/api/lessons/create/
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

        lesson_dir_path = os.path.join(MEDIA_ROOT, f"lesson_{number}")

        try:
            lesson_dir_obj = LessonDir.objects.create(
                name=name,
                number=int(number),
                class_date=class_date,
                title=title,
                description=description,
                path=lesson_dir_path,
            )
            lesson_dir_obj.save()

            os.makedirs(lesson_dir_path)

        except OSError as e:
            if e.errno == 17:
                return Response(
                    {"error": f"folder: {lesson_dir_path} już istenije"},
                    status=status.HTTP_400_BAD_REQUEST,
                )

        return Response(
            f"utworzono nowy folder który jest lekcją w {lesson_dir_path}",
            status=status.HTTP_201_CREATED,
        )
