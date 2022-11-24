import os


class Config:
    CURRENT_DIR = os.path.dirname(os.path.realpath(__file__))

    MITRE_URL = "https://cwe.mitre.org/data/xml/cwec_latest.xml.zip"
    ZIP_FILENAME = f'{MITRE_URL.split("/")[-1].split(".")[0]}.zip'
    ZIP_FILEPATH = os.path.join(CURRENT_DIR, ZIP_FILENAME)

    RAW_JSON_FILEPATH = os.path.join(CURRENT_DIR, "raw.json")
    PARSED_JSON_FILEPATH = os.path.join(CURRENT_DIR, "cwe.json")
