"use client";
import { useState } from "react";

import FileUpload from "./FileUpload";
import FileList from "./FileList";
const page = ({ params: { lessonName } }) => {
  const [fileList, setFileList] = useState([]);

  return (
    <div>
      <h1>{lessonName}</h1>
      <h2>File List</h2>
      <FileList
        lessonName={lessonName}
        setFileList={setFileList}
        fileList={fileList}
      />
      <h2>FileUpload</h2>
      <FileUpload lessonName={lessonName} setFileList={setFileList} />
    </div>
  );
};

export default page;
