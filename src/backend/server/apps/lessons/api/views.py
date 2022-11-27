from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions


class LessonListView(APIView):
    def get(self, request):

        return Response(
            # f"UploadView get {}", status=status.HTTP_201_CREATED
            "lista folderow które są lekcjami",
            status=status.HTTP_200_OK,
        )


class LessonCreateView(APIView):
    """Tworzy nowy folder który jest lekcją"""

    def post(self, request):
        return Response(
            # f"UploadView get {}", status=status.HTTP_201_CREATED
            "utworzono nowy folder który jest lekcją",
            status=status.HTTP_201_CREATED,
        )
