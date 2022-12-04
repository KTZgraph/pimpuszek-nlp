# https://www.youtube.com/watch?v=qWYx5neOh2s
# dnspython trzeba zaisntalwoać jak sie z chmurowej wersji korzytsa
# pip install pymongo dnspython

from pymongo import MongoClient
from bson.objectid import ObjectId
import datetime


class QuizMongo:
    def __init__(
        self,
        mongodb_username,
        mongodb_password,
        mongodb_dabase_name,
    ) -> None:
        # dane musza być słownikiem
        self.mongodb_username = mongodb_username
        self.mongodb_password = mongodb_password
        self.mongodb_dabase_name = mongodb_dabase_name
        self.cluster = f"mongodb+srv://{self.mongodb_username}:{self.mongodb_password}@cluster0.jnppsix.mongodb.net/?retryWrites=true&w=majority"

        self.client = MongoClient(self.cluster)
        # nazwa bazy danych to nazwa aplikacji
        self.database = self.client[self.mongodb_dabase_name]

    def save_quiz_data(self, quiz_filename, quiz_data: list, lesson_name, all_columns):
        # Important: In MongoDB, a collection is not created until it gets content!

        current_date = datetime.datetime.utcnow()
        mongodb_data = {
            "filename": quiz_filename,
            "data": quiz_data,
            "created_at": current_date,
            "all_columns": all_columns,
        }

        # nazwa kolekcji to nazwa lekcji
        self.collection = self.database[lesson_name]

        x = self.collection.insert_one(mongodb_data)
        print(x.inserted_id)

        # # zamykanie połączenia
        self.client.close()
        return x.inserted_id, current_date


class QuizMongoSearcher:
    def __init__(
        self,
        mongodb_username,
        mongodb_password,
        mongodb_dabase_name,
    ) -> None:
        self.mongodb_username = mongodb_username
        self.mongodb_password = mongodb_password
        self.mongodb_dabase_name = mongodb_dabase_name
        self.cluster = f"mongodb+srv://{self.mongodb_username}:{self.mongodb_password}@cluster0.jnppsix.mongodb.net/?retryWrites=true&w=majority"

        self.client = MongoClient(self.cluster)
        # nazwa bazy danych to nazwa aplikacji
        self.database = self.client[self.mongodb_dabase_name]

    def get_quiz_data(self, lesson_name, quiz_mongo_id):
        objInstance = ObjectId(quiz_mongo_id)
        self.collection = self.database[lesson_name]
        document = self.collection.find_one({"_id": objInstance})
        return document

    def update_data_field(
        self, lesson_name, quiz_mongo_id, new_data_field, filed_name="data"
    ):
        # https://kb.objectrocket.com/mongo-db/how-to-update-a-mongodb-document-in-python-356
        objInstance = ObjectId(quiz_mongo_id)
        self.collection = self.database[lesson_name]
        
        document = self.collection.find_one_and_update(
            {"_id": objInstance}, {"$set": {filed_name: new_data_field}}, upsert=True
        )
        return document
