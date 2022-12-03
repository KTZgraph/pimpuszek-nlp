from rest_framework import serializers

from ...models import LessonDir


class LessonDirSerializer(serializers.ModelSerializer):
    class Meta:
        model = LessonDir
        fields = "__all__"
