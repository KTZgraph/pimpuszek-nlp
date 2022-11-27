from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions


# FIXME - docelowo token do NOTION z bazy usera
from server.settings import MEDIA_ROOT, notion_env

from ...helpers.notion_database import (
    read_database,
    read_database_query,
    database_query_to_json,
)


class LessonNotionView(APIView):
    def get(self, request):
        lesson_name = request.query_paramas.get("lesson")

        return Response(
            # f"Połączenie z notion {server_env.NOTION_TOKEN}",
            f"Połączenie z notion",
            status=status.HTTP_200_OK,
        )

    def post(self, request):
        """WARNING - pamietać o uprawnieniach do pliku"""
        lesson_name = request.data.get("lesson_name")
        notion_url = request.data.get("notion_url")
        notion_filename = request.data.get("notion_filename")

        if not (lesson_name and notion_url and notion_filename):
            return Response(
                {
                    "error": "Nie podano wymaganych paramaterów: lesson_name, notion_url, notion_filename"
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        # FIXME - docelowo z bazy usera
        # notion_data = read_database(notion_url, notion_env("NOTION_TOKEN"))
        notion_data_query = read_database_query(notion_url, notion_env("NOTION_TOKEN"))
        data_list = database_query_to_json(notion_data_query)

        return Response(
            # f"Połączenie z notion {server_env.NOTION_TOKEN}",
            {
                # "lesson_name": lesson_name,
                # "notion_url": notion_url,
                # "notion_filename": notion_filename,
                # "notion_data": notion_data,
                # "notion_data_query": notion_data_query,
                "data_list": data_list,
            },
            status=status.HTTP_200_OK,
        )
