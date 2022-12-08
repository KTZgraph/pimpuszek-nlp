"use client";
import React, { useState } from "react";
import axios from "axios";

const NotionView = ({ lessonName, notionDatabaseId }) => {
  const [notionData, setNotionData] = useState([]);
  const [dataColumnList, setDataColumnList] = useState([]);

  const handleClick = async (notionDatabaseId, lessonName) => {
    setNotionData([]);

    console.log("---------------- handleGetData");
    try {
      const response = await axios.get("/api/notion-database", {
        params: {
          databaseId: notionDatabaseId,
          lessonName,
        },
      });
      const { data } = response.data;
      console.log(response);
      setNotionData((prevState) => [...prevState, data]);
    } catch (err) {
      console.log("err: ", err);
    }
  };

  return (
    <div>
      <h2>Wyświetlanie danych - tabelka</h2>
      <button
        onClick={async () => await handleClick(notionDatabaseId, lessonName)}
      >
        Pobierz dane
      </button>
      {notionData ? (
        <ul>
          {/* setDataColumnList(Object(notionData[0]).keys()) */}
          {notionData.map((row, idx) => {
            return (
              <li key={`${notionDatabaseId}-${idx}`}>{JSON.stringify(row)}</li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
};

export default NotionView;
