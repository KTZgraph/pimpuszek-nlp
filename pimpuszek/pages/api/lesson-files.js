//github.com/vercel/next.js/discussions/37886
// https://www.youtube.com/watch?v=wIOpe8S2Mk8

const path = require("path");
import multer from "multer";

const MEDIA_DIR_PATH = path.join(__dirname, "..", "..", "..", "..", "MEDIA");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    // callback(null, "IMAGE");
    callback(null, MEDIA_DIR_PATH);
  },
  filename: (req, file, callback) => {
    console.log(file);
    // callback(null, Date.now() + path.extname(file.originalname));
    callback(
      null,
      Date.now() + file.originalname + path.extname(file.originalname)
    );
  },
});

// const upload = multer({ dest: "uploads/" });
const upload = multer({ storage: storage });

function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

async function handler(req, res) {
  if (req.method === "POST") {
    try {
      // lessonFileInput nazwa z inputa
      await runMiddleware(req, res, upload.single("lessonFileInput"));
      // await runMiddleware(req, res, upload.array());
    } catch (e) {
      /* handle error */
    }

    res.status(200).json({ data: "Hello Everyone!" });
  }
  if (req.method === "GET") {
    res.status(200).json({ data: [] });
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
