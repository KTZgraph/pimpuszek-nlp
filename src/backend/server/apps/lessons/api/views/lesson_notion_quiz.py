from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import json
import os

# FIXME - docelowo token do NOTION z bazy usera
from server.settings import MEDIA_ROOT, notion_env, mongodb_env
from ...models import LessonDir, LessonQuizNotion

from ...helpers.notion_quiz import NotionQuiz
from ...helpers.quiz_creator import QuizCreator
from ...helpers.quiz_mongo import QuizMongo, QuizMongoSearcher

from ..serializers.lesson_quiz_notion import LessonQuizNotionSerializer


class LessonNotionQuizView(APIView):
    """http://127.0.0.1:8000/api/lessons/notion-quiz/
    http://127.0.0.1:8000/api/lessons/notion-quiz/?lesson_name=lesson_2
    {
            "lesson_name": "lesson_1",
            "notion_url": "https://www.notion.so/ae9f91e6a3fe476b95ea6d9eae4c4376?v=b244c91401544d689e2242610fa70026",
            "quiz_filename": "słówka_quiz",
            "all_columns": ["niemiecki", "polski", "Select"],
            "type_column_name": "Select",
            "question_column_list": ["polski"],
            "answer_column_list": ["niemiecki"],
            "example_column_list": []
        }
    """

    def get(self, request):
        search_quiz_mongo_id = "638b9f79e4e8866d46cf23d9"
        lesson_name = request.query_params.get("lesson_name")

        if lesson_name:
            lesson_dir_list = LessonDir.objects.filter(dir_name=lesson_name)
            if not lesson_dir_list.exists():
                return Response(
                    {
                        "error": f"Brak lekcji: {lesson_name}",
                        "details": f"Brak w bazie lekcji obiektu LessonDir z dir_name: {lesson_name}",
                    },
                    status=status.HTTP_400_BAD_REQUEST,
                )

            lesson_quiz_notion_list = LessonQuizNotion.objects.filter(
                lesson_dir=lesson_dir_list[0]
            )

            return Response(
                {
                    "message": f"Quizy na podstawie baz z notion dla lekcji: {lesson_name}",
                    "data": LessonQuizNotionSerializer(
                        lesson_quiz_notion_list, many=True
                    ).data,
                },
                status=status.HTTP_200_OK,
            )

        mongodb_username = mongodb_env("MONGODB_USERNAME")
        mongodb_password = mongodb_env("MONGODB_PASSWORD")
        mongodb_dabase_name = mongodb_env("MONGODB_DATABASE_NAME")

        document = QuizMongoSearcher(
            mongodb_username=mongodb_username,
            mongodb_password=mongodb_password,
            mongodb_dabase_name=mongodb_dabase_name,
        ).get_quiz_data(lesson_name=lesson_name, quiz_mongo_id=search_quiz_mongo_id)

        if document:
            return Response(
                {
                    "message": "GET LessonNotionQuizView",
                    "_id": str(document["_id"]),
                    "filename": document["filename"],
                    "data": document["data"],
                },
                status=status.HTTP_200_OK,
            )

        return Response(
            {
                "error": f"Brak pliku notion dla lekcji: {lesson_name}",
                "details": f"Brak w mongo db dokumnetu dla kolekcji: {lesson_name}",
            },
            status=status.HTTP_400_BAD_REQUEST,
        )

    def post(self, request):
        lesson_name = request.data.get("lesson_name")
        notion_url = request.data.get("notion_url")
        quiz_filename = request.data.get("quiz_filename")

        all_columns = request.data.get("all_columns")
        type_column_name = request.data.get("type_column_name")
        question_column_list = request.data.get("question_column_list")
        answer_column_list = request.data.get("answer_column_list")
        example_column_list = request.data.get("example_column_list")

        user_data = {
            "lesson_name": lesson_name,
            "notion_url": notion_url,
            "quiz_filename": quiz_filename,
            "all_columns": all_columns,
            "type_column_name": type_column_name,
            "question_column_list": question_column_list,
            "answer_column_list": answer_column_list,
            "example_column_list": example_column_list,
        }

        # FIXME
        token = notion_env("NOTION_TOKEN")
        raw_data = NotionQuiz(user_data=user_data, token=token).result
        quiz_data = QuizCreator(
            raw_data=raw_data,
            question_column_list=question_column_list,
            answer_column_list=answer_column_list,
            example_column_list=example_column_list,
            type_column_name=type_column_name,
        ).quiz_data

        # zapisywanie fizyczne pliku
        quiz_filepath = os.path.join(
            MEDIA_ROOT, "lesson_1", "quizzes", f"{quiz_filename}.json"
        )
        with open(quiz_filepath, "w", encoding="utf-8") as f:
            json.dump(quiz_data, f, ensure_ascii=False)

        # FIXMe - na razie na sztywno z pliku - nie chce męczyć api
        with open(quiz_filepath, "r", encoding="utf-8") as f_json:
            quiz_data = json.load(f_json)

        mongodb_username = mongodb_env("MONGODB_USERNAME")
        mongodb_password = mongodb_env("MONGODB_PASSWORD")
        mongodb_dabase_name = mongodb_env("MONGODB_DATABASE_NAME")
        quiz_mongo_id, created_mongodb = QuizMongo(
            mongodb_username=mongodb_username,
            mongodb_password=mongodb_password,
            mongodb_dabase_name=mongodb_dabase_name,
        ).save_quiz_data(
            quiz_filename=quiz_filename,
            quiz_data=quiz_data,
            lesson_name=lesson_name,
        )

        lesson_dir_list = LessonDir.objects.filter(dir_name=lesson_name)
        if not lesson_dir_list.exists():
            return Response(
                {
                    "error": f"Nie można stworzyć quizu na podstawie notion: {notion_url}",
                    "details": f"Brak w bazie lekcji obiektu LessonDir z dir_name: {lesson_name}",
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            LessonQuizNotion.objects.create(
                lesson_dir=lesson_dir_list[0],
                notion_url=notion_url,
                mongodb_collection=lesson_name,
                filename=quiz_filename,
                mongodb_inserted_id=quiz_mongo_id,
                created_at=created_mongodb,
                filepath=quiz_filepath,
            ).save()
        except Exception as e:
            return Response(
                {
                    "error": f"Nie można zapisać do bazy QUizu z notion: {notion_url}",
                    "details": str(e),
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

        return Response(
            # {"message": "POST LessonNotionQuizView", "user_data": user_data},
            {
                "message": "POST LessonNotionQuizView",
                "quiz_data": quiz_data,
                "quiz_mongo_id": str(quiz_mongo_id),
            },
            status=status.HTTP_200_OK,
        )
