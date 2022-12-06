//github.com/vercel/next.js/discussions/37886
https: import multer from "multer";

const upload = multer({ dest: "uploads/" });

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
      await runMiddleware(req, res, upload.single("file"));
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
