const fs = require("fs");
import path from "path";

import { connectMongodb } from "../databases/mongodb-connector";
const NotionQuizzModel = require("../databases/mongodb-schema");

const MEDIA_DIR_PATH = path.join(__dirname, "..", "..", "..", "..", "MEDIA");
const NOTION_FILE_PREFIX = "notion__";

export const readNotionFile = (lessonName, databaseId) => {
  console.log("-------------------- readNotionFile ------------------");
  const notionFileName = `${NOTION_FILE_PREFIX}${databaseId}.json`;
  const notionFilepath = path.join(MEDIA_DIR_PATH, lessonName, notionFileName);
  console.log("notionFilepathL : ", notionFilepath);

  let dataRaw = fs.readFileSync(notionFilepath);
  let dataJson = JSON.parse(dataRaw);
  let columnRowList = dataJson.map((row) => Object.keys(row));
  let uniqueColumnList = [];
  for (const keyList of columnRowList) {
    // console.log("keyList: ", keyList);
    uniqueColumnList = [...keyList];
  }
  //   console.log("uniqueColumnList: ", uniqueColumnList);
  return { columns: uniqueColumnList, data: dataJson };
};

export const getNotionQuizData = (
  lessonName,
  databaseId,
  questionColumnName,
  answerColumnName,
  typeColumnName
) => {
  const { columns, data } = readNotionFile(lessonName, databaseId);

  const quizColumnList = [
    ...columns,
    "quiz__question",
    "quiz__answer",
    "quiz__type",
    "quiz__triesCounter",
    "quiz__triesSum",
  ];

  let quizData = [...data];

  for (const row of quizData) {
    row["quiz__question"] = row[questionColumnName];
    row["quiz__answer"] = row[answerColumnName];
    row["quiz__type"] = row[typeColumnName];
    row["quiz__triesCounter"] = 0;
    row["quiz__triesSum"] = 0;
  }

  console.log("quizData: ", quizData);

  return {
    quizColumnList: quizColumnList,
    quizData: quizData,
  };
};

export const getNotionQuizDatabase = async (lessonName, databaseId) => {
  try {
    const responseMongo = await NotionQuizzModel.find({
      lessonName: lessonName,
      notionDatabaseId: databaseId,
    });

    return responseMongo;
  } catch (err) {
    console.log(err);
  }

  return null;
};
