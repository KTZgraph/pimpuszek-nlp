from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path("api/cwe/", include("apps.common_weakness_enumeration.api.urls")),
    path("admin/", admin.site.urls),
]
