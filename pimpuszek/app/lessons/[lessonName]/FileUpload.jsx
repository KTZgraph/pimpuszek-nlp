"use client";
import axios from "axios";
import { useState } from "react";

const FileUpload = ({ lessonName, setFileList }) => {
  const [lessonFileList, setLessonFileList] = useState([]);

  const handleFileUpload = async () => {
    // e.preventDefault();

    if (lessonFileList.length === 0) return;

    console.log("fileUpload: ", lessonFileList);
    for (const lessonFile in lessonFileList) {
      const formData = new FormData();

      formData.append("file", lessonFile);
      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };

      const response = await axios.post("/api/lesson-files", formData, config);
      console.log("response: ", response);

      const { data } = response.data;
      setFileList((prevState) => [...prevState, data]);
    }
  };

  return (
    <form
      method="POST"
      //  BUG tylko z tą akcją działa
      action="/api/lesson-files"
      //   action={`/lessons/${lessonName}`}
      // action={(e) => handleFileUpload(e)}
      onSubmit={handleFileUpload}
      //   action="/lessons"
      encType="multipart/form-data"
    >
      <input
        //   lessonFileInput ta nazwa w
        //       await runMiddleware(req, res, upload.single("lessonFileInput"));
        name="lessonFileInput"
        id="lessonFileInput"
        type="file"
        onChange={(e) =>
          setLessonFileList((prevState) => [...prevState, e.target.files])
        }
      />
      <input type="submit" />
      {/* <button type="submit" onClick={(e) => handleFileUpload(e)}>
        Dodaj plik do lekcji
      </button> */}
    </form>
  );
};

export default FileUpload;
