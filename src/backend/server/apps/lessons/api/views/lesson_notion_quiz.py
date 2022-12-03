from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import json
import os

# FIXME - docelowo token do NOTION z bazy usera
from server.settings import MEDIA_ROOT, notion_env, mongodb_env

from ...helpers.notion_quiz import NotionQuiz
from ...helpers.quiz_creator import QuizCreator
from ...helpers.quiz_mongo import QuizMongo


class LessonNotionQuizView(APIView):
    """http://127.0.0.1:8000/api/lessons/notion-quiz/
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
        return Response(
            "GET LessonNotionQuizView",
            status=status.HTTP_200_OK,
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
        # raw_data = NotionQuiz(user_data=user_data, token=token).result
        # quiz_data = QuizCreator(
        #     raw_data=raw_data,
        #     question_column_list=question_column_list,
        #     answer_column_list=answer_column_list,
        #     example_column_list=example_column_list,
        # ).quiz_data

        # zapisywanie fizyczne pliku
        quiz_filepath = os.path.join(MEDIA_ROOT, "lesson_1", "my_quiz.json")
        # with open(quiz_filepath, "w", encoding="utf-8") as f:
        #     json.dump(quiz_data, f, ensure_ascii=False)

        # FIXMe - na razie na sztywno z pliku - nie chce męczyć api
        with open(quiz_filepath, "r", encoding="utf-8") as f_json:
            quiz_data = json.load(f_json)

        mongodb_username = mongodb_env("MONGODB_USERNAME")
        mongodb_password = mongodb_env("MONGODB_PASSWORD")
        mongodb_dabase_name = mongodb_env("MONGODB_DATABASE_NAME")
        quiz_mongo_id = QuizMongo(
            quiz_data=quiz_data,
            lesson_name=lesson_name,
            quiz_filename=quiz_filename,
            mongodb_username=mongodb_username,
            mongodb_password=mongodb_password,
            mongodb_dabase_name=mongodb_dabase_name,
        ).save_quiz_data()

        return Response(
            # {"message": "POST LessonNotionQuizView", "user_data": user_data},
            {
                "message": "POST LessonNotionQuizView",
                "quiz_data": quiz_data,
                "quiz_mongo_id": str(quiz_mongo_id),
            },
            status=status.HTTP_200_OK,
        )
