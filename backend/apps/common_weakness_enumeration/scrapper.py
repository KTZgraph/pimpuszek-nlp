import requests
import zipfile
import os
import xmltodict
import json

from .config import Config


class Scrapper:
    def __init__(self) -> None:
        zip_filepath = self.save_zip()
        xml_filepath = self.unpack_zip()
        raw_dict = self.parse_xml_to_json(xml_filepath)
        parsed_list = self.parse_raw_dict(raw_dict)
        parsed_list_filepath = self.save_parsed_list(parsed_list)

        # usuwanie zipa
        os.remove(zip_filepath)
        # Usuwanie pliku xml
        os.remove(xml_filepath)

    def save_zip(self):
        data = requests.get(Config.MITRE_URL)
        with open(Config.ZIP_FILEPATH, "wb") as f:
            f.write(data.content)

        return Config.ZIP_FILEPATH

    def unpack_zip(self):
        with zipfile.ZipFile(Config.ZIP_FILEPATH, "r") as zip_ref:
            extracted_file_names = zip_ref.namelist()
            zip_ref.extractall(Config.CURRENT_DIR)
        # tylko jeden plik w zipie
        extracted_file = extracted_file_names[0]
        xml_filepath = os.path.join(Config.CURRENT_DIR, extracted_file)
        print(xml_filepath)
        return xml_filepath

    def parse_xml_to_json(self, xml_filepath: str):
        xml_data = open(xml_filepath, "r", encoding="utf-8").read()
        parsed_data = xmltodict.parse(xml_data)
        raw_dict = dict(parsed_data)
        return raw_dict

    def parse_raw_dict(self, raw_dict):
        parsed_result = []
        weakness = raw_dict.get("Weakness_Catalog").get("Weaknesses").get("Weakness")

        for w in weakness:
            try:  # mismash json
                extended_description = w["Extended_Description"].get("xhtml:p", [""])
                extended_description = (
                    extended_description[0]
                    if isinstance(extended_description, list)
                    else extended_description
                )
                extended_description = extended_description.replace("\n\t\t\t\t\t", " ")

            except AttributeError:
                extended_description = w["Extended_Description"]
                extended_description = extended_description.replace("\n\t\t\t\t\t", " ")

            except KeyError:
                extended_description = (
                    None  # some CWEs don't have Extended_Description at all
                )

            cwe_code = f'CWE-{w["@ID"]}' if w["@ID"].isnumeric() else w["@ID"]
            description = w["Description"].replace("\n\t\t\t\t\t", " ")

            parsed_result.append(
                {
                    "code": cwe_code,
                    "name": w["@Name"],
                    "abstraction": w["@Abstraction"],
                    "structure": w["@Structure"],
                    "status": w["@Status"],
                    "description": description,
                    "extended_description": extended_description,
                }
            )

        return parsed_result

    def save_parsed_list(self, parsed_list):
        with open(Config.PARSED_JSON_FILEPATH, "w", encoding="utf-8") as f:
            json.dump(parsed_list, f, indent=4)

        return Config.PARSED_JSON_FILEPATH
