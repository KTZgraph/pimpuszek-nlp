"use client";
import { useState } from "react";

import MultipleFileUpload from "./MultipleFileUpload";
// import FileUpload from "./FileUpload";
import FileList from "./FileList";
import NotionUploader from "./NotionUploader";

const page = ({ params: { lessonName } }) => {
  const [fileList, setFileList] = useState([]);
  const [notionList, setNotionList] = useState([]);

  return (
    <div>
      <h1>{lessonName}</h1>
      <h2>Lista plików Notion </h2>

      <NotionUploader lessonName={lessonName} setFileList={setFileList} />

      <h2>Lista Wszystkich Plików (zwykłe + notion)</h2>
      <FileList
        lessonName={lessonName}
        setFileList={setFileList}
        fileList={fileList}
      />
      {/* <h2>FileUpload JEDEN</h2> */}
      {/* <FileUpload lessonName={lessonName} setFileList={setFileList} /> */}

      <hr />
      <h2>Multiple File Upload</h2>
      <MultipleFileUpload lessonName={lessonName} setFileList={setFileList} />
    </div>
  );
};

export default page;
