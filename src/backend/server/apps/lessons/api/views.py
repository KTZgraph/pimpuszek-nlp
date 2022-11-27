from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions

from server.settings import MEDIA_ROOT
import os


from ..models import LessonDir, LessonFile


class LessonDirView(APIView):
    """Tworzenie i podgląd lekcji - folderów"""

    def get(self, request):
        """Zwraca liste lekcji"""
        lesson_dir_list = LessonDir.objects.all()
        response = [str(i) for i in lesson_dir_list]

        return Response(
            f"lista folderow które są lekcjami {response}",
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

        except OSError as e:
            if e.errno == 17:
                return Response(
                    {"error": f"folder: {lesson_dir_path} już istenije"},
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
            f"utworzono nowy folder który jest lekcją w {lesson_dir_path}",
            status=status.HTTP_201_CREATED,
        )


class LessonFileView(APIView):
    def get(self, request):
        lesson_filename = request.query_params.get("filename")
        lesson_dirname = request.query_params.get("lesson")

        if lesson_dirname:
            # http://localhost:8000/api/lessons/files?lesson=lesson_2
            print("lesson_dir: ", lesson_dirname)
            try:
                lesson_dir_obj = LessonDir.objects.get(dir_name=lesson_dirname)
                lesson_file_list = LessonFile.objects.filter(lesson_dir=lesson_dir_obj)

                return Response(
                    f"Pliki: {[str(i) for i in lesson_file_list]}",
                    status=status.HTTP_201_CREATED,
                )

            except Exception as e:
                return Response(
                    {
                        "error": f"Pliki lekcja o nazwie {lesson_dirname} NIE istnieje",
                        "details": str(e),
                    },
                    status=status.HTTP_400_BAD_REQUEST,
                )

        response = []
        lesson_dir_list = LessonDir.objects.all()

        for l_dir in lesson_dir_list:
            lesson_files_list = LessonFile.objects.filter(lesson_dir=l_dir)
            response.append(
                {"lesson": str(l_dir), "files": [str(i) for i in lesson_files_list]}
            )

        return Response(
            f"Pliki: {response}",
            status=status.HTTP_201_CREATED,
        )

    def post(self, request):
        """Dodaje plik do leckcji"""
        lesson_dirname = request.data.get("lesson_name")
        lesson_file = request.data.get("lesson_file")
        lesson_filename = str(lesson_file)

        if not lesson_dirname:
            return Response(
                "Nie udało się dodac pliku - nazwa leckji jest pusta",
                status=status.HTTP_400_BAD_REQUEST,
            )

        if not lesson_file:
            return Response(
                "Nie udało się dodac pliku - nie podano pliku",
                status=status.HTTP_400_BAD_REQUEST,
            )

        lesson_dir_path = os.path.join(MEDIA_ROOT, lesson_dirname)
        if not os.path.isdir(lesson_dir_path):
            return Response(
                f"taki folder NIE istneije  {lesson_dir_path}",
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            lesson_dir = LessonDir.objects.get(dir_name=lesson_dirname)
        except:
            return Response(
                {
                    "message": f"Nie można uploadować do folderu lekcji: {lesson_dirname} folder nie istneieje"
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        # WARNING - zabezpieczenie przed kopiami sprawdzam czy taki plik już istnieje
        lesson_file_obj = LessonFile.objects.filter(
            filename=lesson_filename, lesson_dir__dir_name=lesson_dirname
        )

        print("lesson_file: ", lesson_file)
        print("lesson_dirname: ", lesson_dirname)

        if lesson_file_obj.exists():
            return Response(
                {
                    "message": f"Błąd - plik: {lesson_file} istneije już w folderze {lesson_dirname}"
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            LessonFile.objects.create(
                lesson_dir=lesson_dir, lesson_file=lesson_file, filename=lesson_filename
            ).save()
        except Exception as e:
            return Response(
                {
                    "message": f"Nie udało się dodac pliku:{lesson_file} do lekcji: {lesson_dirname}",
                    "error": str(e),
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

        return Response("UploadView post - dodano plik", status=status.HTTP_201_CREATED)
