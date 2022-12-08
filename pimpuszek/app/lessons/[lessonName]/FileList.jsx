"use client";

import axios from "axios";
import Link from "next/link";
import { useState, useEffect } from "react";

const FileList = ({ lessonName, fileList, setFileList }) => {
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`/api/lesson-files`, {
        params: { lessonName: lessonName },
      });
      const { data } = response.data;
      setFileList(data);
    };

    fetchData();
  }, []);
  return (
    <ul>
      {fileList.map((f, idx) => {
        if (f.startsWith("notion__")) {
          return (
            <li key={`${f}-${idx}`}>
              <Link
                href={`/lessons/${lessonName}/notion/${
                  f.split("notion__")[1].split(".json")[0]
                }`}
              >
                {f}
              </Link>
            </li>
          );
        } else {
          return <li key={`${f}-${idx}`}>{f}</li>;
        }
      })}
    </ul>
  );
};

export default FileList;
