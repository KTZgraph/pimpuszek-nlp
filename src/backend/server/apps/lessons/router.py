# https://youtu.be/5_CU6FJ9Ziw?t=428


class LessonsRouter:
    route_app_labels = {"lessons"}  # liczba poejdyncz bo tak nazywa się aplikacja

    def db_for_read(self, model, **hinsts):
        if model._meta.app_label in self.route_app_labels:
            return "lessons"
        return None

    def db_for_write(self, model, **hints):
        if model._meta.app_label in self.route_app_labels:
            return "lessons"
        return None

    def allow_relation(self, obj1, obj2, **hints):
        """Tu mam tylko jedne model, ale może się na później przydać"""
        if (
            obj1._meta.app_label in self.route_app_labels
            or obj2._meta.app_label in self.route_app_labels
        ):
            return True
        return None

    def allow_migrate(self, db, app_label, model_name=None, **hints):
        """Funkcja do migrapcji
        python manage.py migrate lessons --database=lessons
        """
        if app_label in self.route_app_labels:
            return db == "lessons"
        return None
