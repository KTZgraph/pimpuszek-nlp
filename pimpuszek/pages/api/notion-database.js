const fs = require("fs");
import path from "path";

const { Client } = require("@notionhq/client");

const MEDIA_DIR_PATH = path.join(__dirname, "..", "..", "..", "..", "MEDIA");
const NOTION_FILE_PREFIX = "notion__";

export const config = {
  api: {
    bodyParser: false,
  },
};

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

const getFilteredData = async () => {
  const response = await notion.databases.query({
    database_id: "2d8cae19ab38419f991036f4ae5a2e90",
    // opcjnalne filtry
    // https://developers.notion.com/reference/post-database-query-filter
    filter: {
      property: "niemiecki",
      rich_text: {
        contains: "Kind",
      },
    },
  });

  return response;
};

const getDatabaseData = async (databaseId) => {
  const response = await notion.databases.query({
    database_id: databaseId,
  });

  return response;
};

const saveToJsonFile = async (lessonName, databaseId, data) => {
  const dataString = JSON.stringify(data, null, 4);
  const notionFileName = `${NOTION_FILE_PREFIX}${databaseId}.json`;
  const filepath = path.join(MEDIA_DIR_PATH, lessonName, notionFileName);

  fs.writeFile(filepath, dataString, (err) => {
    if (err) {
      throw err;
    }
    console.log("JSON data is saved. in: ", filepath);
  });

  // return filepath;
  return notionFileName;
};

// read local file from disk
const readNotionFile = (lessonName, databaseId) => {
  const notionFileName = `${NOTION_FILE_PREFIX}${databaseId}.json`;
  const notionFilepath = path.join(MEDIA_DIR_PATH, lessonName, notionFileName);

  let dataRaw = fs.readFileSync(notionFilepath);
  let dataJson = JSON.parse(dataRaw);
  let columnRowList = dataJson.map((row) => Object.keys(row));
  let uniqueColumnList = [];
  for (const keyList of columnRowList) {
    console.log("keyList: ", keyList);
    uniqueColumnList = [...keyList];
  }
  console.log("uniqueColumnList: ", uniqueColumnList);
  return { columns: uniqueColumnList, data: dataJson };
};

// --------------------------
async function handler(req, res) {
  //   const response = await getFilteredData();
  const { databaseId, lessonName } = req.query;

  if (req.method === "GET") {
    try {
      const notionJson = readNotionFile(lessonName, databaseId);
      res.status(200).json({ data: notionJson });
      return;
    } catch (err) {
      console.log(err);
    }
    res
      .status(500)
      .json({ data: "Coś poszło nie tak -  Zwraca odczyt pliku jsona" });
  }

  if (req.method === "POST") {
    const response = await getDatabaseData(databaseId);
    const resultList = response.results;

    const parsedData = [];

    for (const res of resultList) {
      const keyList = Object.keys(res.properties);

      let tmp = {};
      for (const key of keyList) {
        const type = res.properties[key].type;
        let value = null;

        if (type === "title") {
          value = res.properties[key].title[0]?.plain_text;
          tmp[key] = value;
        } else if (type === "select") {
          value = res.properties[key].select.name;
          tmp[key] = value;
        } else if (type === "rich_text") {
          value = res.properties[key].rich_text[0]?.plain_text;
          tmp[key] = value;
        }
      }
      parsedData.push(tmp);
    }

    console.log("POST");
    const jsonFilepath = await saveToJsonFile(
      lessonName,
      databaseId,
      parsedData
    );
    res.status(201).json({ data: jsonFilepath });
    return;
  }
}

export default handler;
