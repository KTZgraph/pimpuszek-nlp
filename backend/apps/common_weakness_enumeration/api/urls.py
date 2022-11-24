from django.urls import path
from .views import ManageCWE

urlpatterns = [
    path("manage/", ManageCWE.as_view()),
]
