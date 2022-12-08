"use client";

import axios from "axios";
import { useEffect, useState } from "react";

const QuizViewer = ({
  lessonName,
  notionDatabaseId,
  setColumnList,
  mongoDatabaseId,
  setMongoDatabaseId,
}) => {
  const [quizzDataList, setQuizzDataList] = useState([]);
  const [quizzColumnList, setQuizzColumnList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`/api/lesson-quizzes`, {
        params: { lessonName: lessonName, databaseId: notionDatabaseId },
      });
      console.log(response);
      // setColumnList(response.data?.columns);

      // WARNING bez prev state
      const dataList = response.data?.data?.data || [];
      setQuizzDataList(dataList);

      const columns = response.data?.data?.columns || [];
      setQuizzColumnList(columns);
      setColumnList(columns);

      const dbId = response.data?.mongoDatabaseId;
      if (dbId) setMongoDatabaseId(dbId);
      else setMongoDatabaseId("");
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Widok quizu na podstaiwe pliku z bazy</h2>
      <div>mongoDatabaseId:{mongoDatabaseId}</div>
      <div>{JSON.stringify(quizzColumnList)}</div>
      <div>{JSON.stringify(quizzDataList)}</div>
    </div>
  );
};

export default QuizViewer;
