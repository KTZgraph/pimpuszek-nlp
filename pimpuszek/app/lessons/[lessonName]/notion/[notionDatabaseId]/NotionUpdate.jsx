"use client";
import React, { useState } from "react";
import axios from "axios";

const NotionSaver = ({ lessonName, notionDatabaseId }) => {
  const handleClick = async (notionDatabaseId, lessonName) => {
    console.log("---------------- handleSaveData");

    try {
      const response = await axios.post(
        `/api/notion-database?lessonName=${lessonName}&databaseId=${notionDatabaseId}`
      );
      // const { data } = response.data;
      console.log(response);
      const { data } = response.data;
      console.log("----------------------data");
      console.log(data);

      // setInfo(data.data);
    } catch (err) {
      console.log("err: ", err);
    }
  };

  return (
    <div>
      <h2>
        Zapisywanie danych - tworzy nowy albo aktulizuje już istniejący plik
      </h2>
      <button
        onClick={async () => await handleClick(notionDatabaseId, lessonName)}
      >
        Zapisz Data
      </button>
    </div>
  );
};

export default NotionSaver;
