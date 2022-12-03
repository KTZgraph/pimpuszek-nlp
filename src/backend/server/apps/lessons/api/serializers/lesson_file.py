from rest_framework import serializers

from ...models import LessonFile


class LessonFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = LessonFile
        fields = "__all__"
