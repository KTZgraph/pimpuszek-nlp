import { useState, useEffect } from "react";

import Quizz from "../components/Quizz";
import "./QuizzList.scss";

const DUMMY_DATA = [
  {
    id: 1,
    question: "Question 1",
    answer: "Answer 1",
    type: "rzeczwonik",
    examples: ["example 1", "example 2"],
  },
  {
    id: 2,
    question: "Question 2",
    answer: "Answer 2",
    type: "przymiotnik",
  },
  {
    id: 3,
    question: "Question 3",
    answer: "Answer 3",
    type: "zdanie pytające",
  },
];

const QuizzList = () => {
  const [quizzId, setQuizzId] = useState(0);
  const [data, setData] = useState(DUMMY_DATA);
  const [quizzesTotal, setQuizzesTotal] = useState(0);

  const handleNext = (mark) => {
    console.log("Odpowiedź mark: ", mark);

    quizzId < data.length - 1
      ? setQuizzId(quizzId + 1)
      : setQuizzId(data.length - 1);
  };

  useEffect(() => {
    setQuizzesTotal(data.length);
  }, [data]);

  return (
    <div className="quiz-list">
      <div className="quiz-list__counter">
        {quizzId + 1} / {quizzesTotal}
      </div>
      <Quizz
        question={data[quizzId].question}
        answer={data[quizzId].answer}
        placeholder={data[quizzId].type}
        handleNext={handleNext}
        exampleList={data[quizzId].examples}
      />
      {quizzId === data.length - 1 ? <p>Koniec quizów</p> : null}
    </div>
  );
};

export default QuizzList;
