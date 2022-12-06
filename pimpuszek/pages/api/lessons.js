// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const fs = require("fs");
const path = require("path");

const MEDIA_DIR_PATH = path.join(__dirname, "..", "..", "..", "..", "MEDIA");

const createMediaDir = async () => {
  console.log("createMediaDir: ", MEDIA_DIR_PATH);
  if (!fs.existsSync(MEDIA_DIR_PATH)) {
    fs.mkdirSync(MEDIA_DIR_PATH);
  }
};

const createLesson = (lessonName) => {
  // dla pewnoście przed wejściem w link lekcji tworzę root dir
  createMediaDir();

  console.log("createLesson\n\n\n\n");
  var lessonDirPath = path.join(
    __dirname,
    "..",
    "..",
    "..",
    "..",
    "MEDIA",
    lessonName
  );
  console.log("lessonDirPath: ", lessonDirPath);
  if (!fs.existsSync(lessonDirPath)) {
    fs.mkdirSync(lessonDirPath);
  }
};

const listDirectories = async (pathToDirectory) => {
  const directoriesInDIrectory = fs
    .readdirSync(pathToDirectory, { withFileTypes: true })
    .filter((item) => item.isDirectory())
    .map((item) => item.name);

  return directoriesInDIrectory;
};

export default async function handler(req, res) {
  if (req.method === "POST") {
    /* Tworzy nowy folder lekcji - numery po kolei od 1*/
    const listDir = await listDirectories(MEDIA_DIR_PATH);
    const lessonName = `lesson_${listDir.length + 1}`;
    createLesson(lessonName);
    return res.status(201).json({ data: lessonName });
  }
  if (req.method === "GET") {
    /*Zwraca listę folderów lekcyjnych */
    const listDir = await listDirectories(MEDIA_DIR_PATH);
    console.log("listDir: ", listDir);
    res.status(200).json({ data: listDir });
  }
}
