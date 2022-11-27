import pandas as pd
import numpy as np
import json


def get_sheet_name(filepath: str):
    xl = pd.ExcelFile(filepath)
    # print(xl.sheet_names)
    return xl.sheet_names


def sheet_to_dict(filepath: str, sheet_name: str):
    df = pd.read_excel(filepath, sheet_name=sheet_name)
    df.replace({np.NAN: None}, inplace=True)

    headers = [header for header in df.columns.ravel()]

    data = []
    for row in df.index:
        tmp = {}
        for idx, header in enumerate(headers):
            tmp[idx] = df[header][row]
        data.append(tmp)

    result = {
        "headers": [{idx: header} for idx, header in enumerate(headers)],
        "data": data,
    }
    return result


def save_json(data: dict, filepath):
    json_string = json.dumps(data, ensure_ascii=False, indent=4)
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(json_string)


def excel_to_json(filepath: str):
    sheet_list = get_sheet_name(filepath)

    result = []
    for sheet in sheet_list:
        result.append(sheet_to_dict(filepath, sheet))

    return result
