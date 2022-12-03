import requests
import json

from .notion_data_query_parser import NotionDataQueryParser


class NotionQuiz:
    def __init__(self, user_data: dict, token: str) -> None:
        self.lesson_name = user_data["lesson_name"]
        self.notion_url = user_data["notion_url"]
        self.quiz_filename = user_data["quiz_filename"]
        self.all_columns = user_data["all_columns"]
        self.type_column_name = user_data["type_column_name"]
        self.question_column_list = user_data["question_column_list"]
        self.answer_column_list = user_data["answer_column_list"]
        self.example_column_list = user_data["example_column_list"]

        self.token = token

        self.metadata = self.get_database_metadata()
        query_data = self.get_database_query()
        self.result = NotionDataQueryParser(query_data).parse()

    def get_headers(self):
        headers = {
            "Authorization": "Bearer " + self.token,
            "Notion-Version": "2022-06-28",
            # 400 {"object":"error","status":400,"code":"validation_error","message":"body failed validation: body.parent should be defined, instead was `undefined`."}
            "Content-Type": "application/json",
        }
        return headers

    def get_database_id(self):
        database_id = self.notion_url.split("?")[0]
        database_id = database_id.split("https://www.notion.so/")[1]
        return database_id

    def get_database_metadata(self):
        database_id = self.get_database_id()
        API_URL = f"https://api.notion.com/v1/databases/{database_id}"
        res = requests.request("GET", API_URL, headers=self.get_headers())
        data = res.json()

        return {
            "notion_created_at": data.get("created_time"),
            "notion_modified_at": data.get("last_edited_time"),
            "notion_id": data.get("id"),
            "notion_title": data.get("title")[0].get("plain_text"),
            "notion_properties": data.get("properties").keys(),
            "notion_parent_dict": data.get("parent"),
        }

    def get_database_query(self):
        database_id = self.get_database_id()
        API_URL = f"https://api.notion.com/v1/databases/{database_id}/query"
        res = requests.request("POST", API_URL, headers=self.get_headers())
        data = res.json()
        return data
