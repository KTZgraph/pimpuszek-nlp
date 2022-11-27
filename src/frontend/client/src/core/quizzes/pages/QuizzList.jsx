import { useState, useEffect } from "react";

import Quizz from "../components/Quizz";
import "./QuizzList.scss";

const DUMMY_DATA = [
  {
    id: 1,
    question: "Question 1",
    answer: "Answer 1",
  },
  {
    id: 2,
    question: "Question 2",
    answer: "Answer 2",
  },
  {
    id: 3,
    question: "Question 3",
    answer: "Answer 3",
  },
];

const QuizzList = () => {
  const [quizzId, setQuizzId] = useState(0);
  const [data, setData] = useState(DUMMY_DATA);
  const [quizzesTotal, setQuizzesTotal] = useState(0);

  useEffect(() => {
    setQuizzesTotal(data.length);
  }, []);

  return (
    <div className="quiz-list">
      <div className="quiz-list__counter">
        {quizzId + 1} / {quizzesTotal}
      </div>
      <Quizz question={data[quizzId].question} answer={data[quizzId].answer} />
    </div>
  );
};

export default QuizzList;
