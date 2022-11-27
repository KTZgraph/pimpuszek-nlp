# pip install requests
import requests
import json


def get_notion_headers(token):
    headers = {
        "Authorization": "Bearer " + token,
        "Notion-Version": "2022-06-28",
        # 400 {"object":"error","status":400,"code":"validation_error","message":"body failed validation: body.parent should be defined, instead was `undefined`."}
        "Content-Type": "application/json",
    }
    return headers


def get_database_id_from_url(notion_url: str):
    database_id = notion_url.split("?")[0]
    database_id = database_id.split("https://www.notion.so/")[1]
    return database_id


def read_database(notion_database_url: str, token: str):
    database_id = get_database_id_from_url(notion_database_url)

    readUrl = f"https://api.notion.com/v1/databases/{database_id}"

    res = requests.request("GET", readUrl, headers=get_notion_headers(token))
    data = res.json()

    # print(res.status_code)
    # print(res.text)

    # with open("./db.json", "w", encoding="utf-8") as f:
    #     json.dump(data, f, ensure_ascii=False)

    # return data
    return {
        "notion_created_at": data.get("created_time"),
        "notion_modified_at": data.get("last_edited_time"),
        "notion_id": data.get("id"),
        "notion_title": data.get("title")[0].get("plain_text"),
        "notion_properties": data.get("properties").keys(),
        "notion_parent_dict": data.get("parent"),
    }


def read_database_query(notion_database_url: str, token: str):
    database_id = get_database_id_from_url(notion_database_url)

    readUrl = f"https://api.notion.com/v1/databases/{database_id}/query"

    res = requests.request("POST", readUrl, headers=get_notion_headers(token))
    data = res.json()

    # with open("./db_query2.json", "w", encoding="utf-8") as f:
    #     json.dump(data, f, ensure_ascii=False)

    return data


def parse_rich_text(value):
    """WARNING - ostrożnie z typami z notion"""
    return value.get("rich_text", [{}])[0].get("plain_text")


def parse_select(value):
    """WARNING - ostrożnie z typami z notion"""
    return value.get("select", {}).get("name")


def parse_title(value):
    """WARNING - ostrożnie z typami z notion"""
    return value.get("title", [{}])[0].get("plain_text")


def database_query_to_json(notion_data_query):
    data = []
    try:
        result_list = notion_data_query.get("results")  # [:10]
        # return len(result_list)

        for item in result_list:
            properties = item.get("properties")
            for key, value in properties.items():

                if value.get("type", "") == "rich_text":
                    data.append({key: parse_rich_text(value)})
                if value.get("type", "") == "select":
                    data.append({key: parse_select(value)})
                if value.get("type", "") == "title":
                    data.append({key: parse_rich_text(value)})

        return data
    except BaseException as e:
        print("\n\n\n\ndatabase_query_to_json")
        print(e)
