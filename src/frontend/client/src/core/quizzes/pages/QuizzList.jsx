import { useState, useEffect } from "react";
import axios from "axios";
import Quizz from "../components/Quizz";
import "./QuizzList.scss";

const QuizzList = () => {
  const [quizzId, setQuizzId] = useState(0);
  const [data, setData] = useState([]);
  const [quizzesTotal, setQuizzesTotal] = useState(0);

  const [quizColumns, setQuizColumns] = useState({
    question_column: "",
    answer_column: "",
    type_column: "",
    example_column: "",
  });

  const handleNext = (mark) => {
    console.log("Odpowiedź mark: ", mark);

    quizzId < data.length - 1
      ? setQuizzId(quizzId + 1)
      : setQuizzId(data.length - 1);
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        "/api/lessons/notion?lesson=lesson_1&notion_filename=słówka.json"
      );

      console.log(result.data);
      setQuizColumns({
        question_column: result.data.question_column,
        answer_column: result.data.answer_column,
        type_column: result.data.type_column,
        example_column: result.data.example_column,
      });

      setData(result.data.data);
      setQuizzesTotal(result.data.data.length);
    };

    fetchData();
    // }, [data]);
  }, []);

  if (data?.length === 0) return null;

  return (
    <div className="quiz-list">
      <div className="quiz-list__counter">
        {quizzId + 1} / {quizzesTotal}
      </div>
      <Quizz
        // question={data[quizzId].question}
        question={data[quizzId][quizColumns.question_column]}
        answer={data[quizzId][quizColumns.answer_column]}
        placeholder={data[quizzId][quizColumns.type_column]}
        handleNext={handleNext}
        // exampleList={data[quizzId].examples}
        exampleList={data[quizzId][quizColumns.example_column]}
      />

      {/* {quizzId === data.length - 1 ? <p>Koniec quizów</p> : null} */}
    </div>
  );
};

export default QuizzList;
