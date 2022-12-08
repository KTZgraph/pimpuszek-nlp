//github.com/vercel/next.js/discussions/37886
// https://www.youtube.com/watch?v=wIOpe8S2Mk8

import formidable from "formidable";
import path from "path";
import fs from "fs/promises";

export const config = {
  api: {
    bodyParser: false,
  },
};

const MEDIA_DIR_PATH = path.join(__dirname, "..", "..", "..", "..", "MEDIA");

// zamiana na wersje promise
const readFile = (req, lessonName, saveLocally) => {
  const options = {};

  if (saveLocally) {
    options.uploadDir = path.join(MEDIA_DIR_PATH, lessonName);
    options.filename = (name, ext, path, form) => {
      return (
        Date.now().toString() +
        "__" +
        path.originalFilename.replaceAll(" ", "_")
      );
    };
  }

  const form = formidable(options);

  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      resolve({ fields, files });
    });
  });
};

async function handler(req, res) {
  if (req.method === "POST") {
    const { lessonName } = req.query;
    try {
      await fs.readdir(path.join(MEDIA_DIR_PATH, lessonName));
    } catch (error) {
      await fs.mkdir(path.join(MEDIA_DIR_PATH, lessonName));
    }
    const file = await readFile(req, lessonName, true);
    // console.log("FILE: ", file.files.lessonFile);
    // console.log("FILE: ", file.files.lessonFile.newFilename);
    // console.log("FILE: ", file.files.lessonFile.originalFilename);
    // console.log("FILE: ", file.files.lessonFile.filepath:);
    res.status(201).json({ data: file.files.lessonFile.newFilename });
  }
  if (req.method === "GET") {
    const { lessonName } = req.query;
    const dir = path.join(MEDIA_DIR_PATH, lessonName);
    const files = await fs.readdir(dir);
    // TODO =- podzioelić na zwykle pliki, pliki notion
    res.status(200).json({ data: files });
  }
}

export default handler;
