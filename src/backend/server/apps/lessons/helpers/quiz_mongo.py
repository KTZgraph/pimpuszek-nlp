# https://www.youtube.com/watch?v=qWYx5neOh2s
# dnspython trzeba zaisntalwoać jak sie z chmurowej wersji korzytsa
# pip install pymongo dnspython

from pymongo import MongoClient


class QuizMongo:
    def __init__(
        self,
        quiz_data: list,
        lesson_name,
        quiz_filename,
        mongodb_username,
        mongodb_password,
        mongodb_dabase_name,
    ) -> None:
        # dane musza być słownikiem
        self.quiz_data = {"quiz_filename": quiz_filename, "data": quiz_data}
        self.lesson_name = lesson_name
        self.quiz_filename = quiz_filename
        self.mongodb_username = mongodb_username
        self.mongodb_password = mongodb_password
        self.mongodb_dabase_name = mongodb_dabase_name
        self.cluster = f"mongodb+srv://{self.mongodb_username}:{self.mongodb_password}@cluster0.jnppsix.mongodb.net/?retryWrites=true&w=majority"

        self.client = MongoClient(self.cluster)
        # nazwa bazy danych to nazwa aplikacji
        self.database = self.client[self.mongodb_dabase_name]

    def save_quiz_data(self):
        # Important: In MongoDB, a collection is not created until it gets content!

        try:
            print(self.database.list_collection_names())
        except Exception as e:
            print("e", e)

        # nazwa kolekcji to nazwa lekcji
        self.collection = self.database[self.lesson_name]

        x = self.collection.insert_one(self.quiz_data)
        print(x.inserted_id)

        # # zamykanie połączenia
        self.client.close()
        return x.inserted_id
