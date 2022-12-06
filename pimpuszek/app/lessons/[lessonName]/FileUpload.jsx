"use client";
import axios from "axios";
import { useState } from "react";

const FileUpload = ({ lessonName, setFileList }) => {
  const [lessonFileList, setLessonFileList] = useState([]);

  const handleFileUpload = async () => {
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
    <div>
      <input
        type="file"
        onChange={(e) =>
          setLessonFileList((prevState) => [...prevState, e.target.files])
        }
      />
      <button onClick={handleFileUpload}>Dodaj plik do lekcji</button>
    </div>
  );
};

export default FileUpload;
