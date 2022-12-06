"use client";

import axios from "axios";
import { useState, useEffect } from "react";

const FileList = ({ lessonName, fileList, setFileList }) => {
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`/api/lesson-files?`, {
        params: { lessonName: lessonName },
      });
      const { data } = response.data;
      setFileList(data);
    };

    fetchData();
  }, []);
  return (
    <ul>
      {fileList.map((f, idx) => (
        <li key={`${f}-${idx}`}>{f}</li>
      ))}
    </ul>
  );
};

export default FileList;
