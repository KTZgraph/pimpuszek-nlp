import React from "react";

const QuizUpdate = ({ lessonName, notionDatabaseId, mongoDatabaseId }) => {
  return (
    <div>
      <h2>Quiz już istenije w baze - ale można go zaktualizować</h2>
      <p>{lessonName}</p>
      <p>{notionDatabaseId}</p>
      <p>{mongoDatabaseId}</p>
    </div>
  );
};

export default QuizUpdate;
