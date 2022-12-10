// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { connectMongodb } from "../../services/mongodb/mongodb-connector";
import {
  readNotionFile,
  getNotionQuizData,
  getNotionQuizDatabase,
} from "../../services/notion/notion-files";

const NotionQuizzModel = require("../../lib/mongodb/mongodb-schema");

export default async function handler(req, res) {
  const { databaseId, lessonName } = req.query;

  connectMongodb().catch((error) => console.error(error));

  if (req.method === "GET") {
    try {
      const responseMongo = await getNotionQuizDatabase(lessonName, databaseId);

      if (responseMongo.length > 0) {
        res.status(200).json({
          data: responseMongo[0],
          mongoDatabaseId: responseMongo[0]._id,
        });
        return;
      }

      const notionFile = readNotionFile(lessonName, databaseId);

      console.log("Czyta z pliku");
      console.log(notionFile);
      res.status(200).json({ data: notionFile });
      return;
    } catch (err) {
      console.error(err);
    }
    res
      .status(400)
      .json({ data: `[ERROR] GET - pobierane dancyh z mongodb ${databaseId}` });
  }

  //   -----------------------  POST ---------------------------------
  if (req.method === "POST") {
    const { questionColumnName, answerColumnName, typeColumnName } = req.body;

    try {
      const responseMongo = await getNotionQuizDatabase(lessonName, databaseId);
      console.log("responseMongo: ", responseMongo);

      if (responseMongo.length > 0) {
        res.status(400).json({
          message: "Nie można utworzyć quizu - on już istneije w bazie",
        });
        return;
      }
    } catch (err) {
      console.error(err);
    }

    const { quizColumnList, quizData } = getNotionQuizData(
      lessonName,
      databaseId,
      questionColumnName,
      answerColumnName,
      typeColumnName
    );

    const notionQuizData = {
      lessonName: lessonName,
      notionDatabaseId: databaseId,
      columns: quizColumnList,
      data: quizData,
    };

    try {
      await NotionQuizzModel.create(
        notionQuizData,
        function (err, notionQuizData) {
          if (err) return err;
          res.status(201).json({ data: notionQuizData._id });
        }
      );
    } catch (error) {
      console.error(error);
      res.status(500).json({
        data: `[Error] POST Created nowy quiz`,
      });
    }
  }
}
