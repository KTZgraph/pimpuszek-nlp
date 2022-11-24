from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from ..scrapper import Scrapper


class ManageCWE(APIView):
    def post(self, request):
        """Metoda do tworzenia CWE"""
        try:
            Scrapper()
            return Response(
                {
                    "success": "Successfuly saved CWE to database",
                },
                status=status.HTTP_200_OK,
            )

        except Exception as e:
            return Response(
                {
                    "error": "Something went wrong when saving CWE to database",
                    "details": str(e),
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
