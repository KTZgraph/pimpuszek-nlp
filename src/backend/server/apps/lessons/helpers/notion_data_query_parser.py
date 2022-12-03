class NotionDataQueryParser:
    def __init__(self, notion_data_query) -> None:
        self.notion_data_query = notion_data_query

    def parse_property(self, value):
        if value.get("type", "") == "rich_text":
            return value.get("rich_text", [{}])[0].get("plain_text")

        if value.get("type", "") == "select":
            return value.get("select", {}).get("name")

        if value.get("type", "") == "title":
            return value.get("title", [{}])[0].get("plain_text")

    def parse(self):
        result = []
        result_list = self.notion_data_query.get("results")

        for item in result_list:
            properties = item.get("properties")
            tmp = {}
            for key, value in properties.items():
                tmp[key] = self.parse_property(value)

            result.append(tmp)

        return result
