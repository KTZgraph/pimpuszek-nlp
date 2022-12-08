import formidable from "formidable";
import path from "path";
import fs from "fs/promises";

export const config = {
  api: {
    bodyParser: false,
  },
};

// zamiana na wersje promise
const readFile = (req, saveLocally) => {
  const options = {};

  if (saveLocally) {
    options.uploadDir = path.join(process.cwd(), "/public/images");
    options.filename = (name, ext, path, form) => {
      //   console.log("ext:\n\n", ext);
      console.log("path:\n\n", path.originalFilename);
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

const handler = async (req, res) => {
  console.log("handler\n\n\n\n");
  try {
    console.log("await fs.readdir(path.join(process.cwd()");
    await fs.readdir(path.join(process.cwd() + "/public" + "/images"));
  } catch (error) {
    await fs.mkdir(path.join(process.cwd() + "/public" + "/images"));
  }

  await readFile(req, true);
  res.status(201).json({ data: "ok" });
};

export default handler;
