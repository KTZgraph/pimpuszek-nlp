from rest_framework import serializers

from ...models import LessonQuizNotion


class LessonQuizNotionSerializer(serializers.ModelSerializer):
    class Meta:
        model = LessonQuizNotion
        fields = "__all__"
