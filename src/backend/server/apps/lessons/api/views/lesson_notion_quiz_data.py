from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import json
import os

# FIXME - docelowo token do NOTION z bazy usera
from server.settings import MEDIA_ROOT, notion_env, mongodb_env
from ...models import LessonDir, LessonQuizNotion

from ...helpers.quiz_mongo import QuizMongoSearcher


class LessonNotionQuizDataView(APIView):
    def get(self, request):
        lesson_name = request.query_params.get("lesson_name")
        quiz_filename = request.query_params.get("quiz_filename")

        lesson_dir_list = LessonDir.objects.filter(dir_name=lesson_name)
        if not lesson_dir_list.exists():
            return Response(
                {
                    "error": f"Brak quizu dla lekcji: {lesson_name}",
                    "details": f"Brak w bazie lekcji obiektu LessonQuizNotion z lesson_dir: {lesson_name}",
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        lesson_quiz_notion_list = LessonQuizNotion.objects.filter(
            lesson_dir=lesson_dir_list[0], filename=quiz_filename
        )

        if not lesson_quiz_notion_list.exists():
            return Response(
                {
                    "error": f"Brak quizu dla lekcji: {lesson_name} o nazwie {quiz_filename}",
                    "details": f"Brak w bazie lekcji obiektu LessonQuizNotion z polem filename: {lesson_name}",
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        search_quiz_mongo_id = lesson_quiz_notion_list[0].mongodb_inserted_id

        mongodb_username = mongodb_env("MONGODB_USERNAME")
        mongodb_password = mongodb_env("MONGODB_PASSWORD")
        mongodb_dabase_name = mongodb_env("MONGODB_DATABASE_NAME")

        document = QuizMongoSearcher(
            mongodb_username=mongodb_username,
            mongodb_password=mongodb_password,
            mongodb_dabase_name=mongodb_dabase_name,
        ).get_quiz_data(lesson_name=lesson_name, quiz_mongo_id=search_quiz_mongo_id)

        return Response(
            {
                "message": "LessonNotionQuizDataView",
                "data": {
                    "lesson_name": lesson_name,
                    "quiz_filename": quiz_filename,
                    "data": document["data"],
                    "_id": str(document["_id"]),
                },
            },
            status=status.HTTP_200_OK,
        )
