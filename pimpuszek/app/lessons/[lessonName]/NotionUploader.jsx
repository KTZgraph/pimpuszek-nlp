"use client";
import axios from "axios";

import { useState, useRef } from "react";

const NotionUploader = ({ lessonName, setFileList }) => {
  // TODO zobaczyć z useRef
  const notionUrlRef = useRef("");
  const [notionUrl, setNotionUrl] = useState("");

  const handleClick = async () => {
    console.log("notionUrl: ", notionUrl);
    const databaseId = notionUrl
      .split("https://www.notion.so/")[1]
      .split("?")[0];

    console.log("databaseId: ", databaseId);
    try {
      const response = await axios.post(
        `/api/notion-database?lessonName=${lessonName}&databaseId=${databaseId}`
      );
      // const { data } = response.data;
      console.log(response);
      const { data } = response.data;
      console.log("----------------------data");
      console.log(data);

      //   setFileList(data)
    } catch (err) {
      console.log("err: ", err);
    }
  };

  return (
    <div>
      <h2>Dodawacz nowego pliku notion</h2>
      <label htmlFor="notionUrl">Podaj url do notion</label>
      <input
        id="notionUrl"
        name="notionUrl"
        type="text"
        value={notionUrl}
        // value={notionUrlRef.current.value}
        onChange={(e) => setNotionUrl(e.target.value)}
      />
      <button onClick={async () => await handleClick()} type="submit">
        Zapisz do bazy
      </button>
    </div>
  );
};

export default NotionUploader;
