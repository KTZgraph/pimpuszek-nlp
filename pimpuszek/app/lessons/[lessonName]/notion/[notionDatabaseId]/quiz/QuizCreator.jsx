"use client";
import axios from "axios";
import { useState } from "react";

const QuizCreator = ({ columnList, lessonName, notionDatabaseId }) => {
  const [quizDatabaseId, setQuizDatabaseId] = useState("");
  const [quizzStructure, setQuizzStructure] = useState({
    questionColumnName: "polski",
    answerColumnName: "niemiecki",
    typeColumnName: "Select",
  });

  const handleClick = async () => {
    console.log("------------- handleClick ---------------");
    console.log(quizzStructure);

    if (!columnList || columnList.length === 0) return;

    if (!columnList.includes(quizzStructure.questionColumnName)) {
      console.log("Nieprawidłowa wartośći inputu questionColumnName");
      return;
    }
    if (!columnList.includes(quizzStructure.answerColumnName)) {
      console.log("Nieprawidłowa wartośći inputu answerColumnName");
      return;
    }

    if (!columnList.includes(quizzStructure.typeColumnName)) {
      console.log("Nieprawidłowa wartośći inputu typeColumnName");
      return;
    }

    const body = {
      questionColumnName: quizzStructure.questionColumnName,
      answerColumnName: quizzStructure.answerColumnName,
      typeColumnName: quizzStructure.typeColumnName,
    };

    const response = await axios.post(
      `/api/lesson-quizzes?lessonName=${lessonName}&databaseId=${notionDatabaseId}`,
      body
    );

    const { data } = response.data;
    console.log(data);
    setQuizDatabaseId(data);
  };

  if (columnList.length === 0 || !columnList) return <p>Loading...</p>;

  return (
    <div>
      <h2>QuizCreator</h2>
      {columnList}
      <div>
        <label htmlFor="questionColumn">Podaj nazwę kolumny do pytań</label>
        <input
          type="text"
          id="questionColumn"
          name="questionColumn"
          value={quizzStructure.questionColumnName}
          onChange={(e) =>
            setQuizzStructure((prevState) => ({
              ...prevState,
              questionColumnName: e.target.value,
            }))
          }
        />
      </div>
      <div>
        <label htmlFor="answerColumn">
          Podaj nazwę kolumny która zawiera odpowiedzi
        </label>
        <input
          type="text"
          id="answerColumn"
          name="answerColumn"
          value={quizzStructure.answerColumnName}
          onChange={(e) =>
            setQuizzStructure((prevState) => ({
              ...prevState,
              answerColumnName: e.target.value,
            }))
          }
        />
      </div>
      <div>
        <label htmlFor="typeColumn">
          Podaj nazwę kolumny, która zawiera typy
        </label>
        <input
          type="text"
          id="typeColumn"
          name="typeColumn"
          value={quizzStructure.typeColumnName}
          onChange={(e) =>
            setQuizzStructure((prevState) => ({
              ...prevState,
              typeColumnName: e.target.value,
            }))
          }
        />
      </div>
      <button onClick={handleClick}>Utwórz quiz z danych</button>
      {quizDatabaseId ? (
        <p>Utworzono nowy quiz w bazie MongoDB: {quizDatabaseId}</p>
      ) : null}
    </div>
  );
};

export default QuizCreator;
