"use client";
import React, { useState } from "react";
import QuizViewer from "./QuizViewer";
import QuizCreator from "./QuizCreator";
import QuizUpdate from "./QuizUpdate";

const page = ({ params: { notionDatabaseId, lessonName } }) => {
  const [columnList, setColumnList] = useState([]);
  const [mongoDatabaseId, setMongoDatabaseId] = useState("");

  return (
    <div>
      <h1>Quiz z pliku z notion - z bazy notion</h1>
      <p>
        {lessonName}/{notionDatabaseId}
      </p>
      <QuizViewer
        lessonName={lessonName}
        notionDatabaseId={notionDatabaseId}
        setColumnList={setColumnList}
        mongoDatabaseId={mongoDatabaseId}
        setMongoDatabaseId={setMongoDatabaseId}
      />
      <hr />

      {mongoDatabaseId ? (
        <QuizUpdate
          lessonName={lessonName}
          notionDatabaseId={notionDatabaseId}
          mongoDatabaseId={mongoDatabaseId}
        />
      ) : (
        <QuizCreator
          lessonName={lessonName}
          notionDatabaseId={notionDatabaseId}
          columnList={columnList}
        />
      )}
    </div>
  );
};

export default page;
