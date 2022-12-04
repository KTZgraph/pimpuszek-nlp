import { useState, useEffect } from "react";

import Quizz from "./Quiz";

const QuizViewer = ({ fileData, handleMark, randomRowNumber }) => {
  // const [rowId, setRowId] = useState(0);

  const [rowId, setRowId] = useState(randomRowNumber);
  const [quizzesTotal, setQuizzesTotal] = useState(0);
  const [currentQuiz, setCurrentQuiz] = useState(null);

  useEffect(() => {
    setQuizzesTotal(fileData.data.length);
    setCurrentQuiz(fileData.data[randomRowNumber]);
  }, [fileData]);

  const handleNext = (mark) => {
    console.log("Odpowiedź mark: ", mark);

    // rowId < fileData.data.length - 1
    //   ? setRowId(rowId + 1)
    //   : setRowId(fileData.data.length - 1);

    setCurrentQuiz(fileData.data[rowId]);

    // update API
    handleMark(rowId, mark);
    setRowId(randomRowNumber);
  };

  if (!currentQuiz) return null;
  console.log("rowId: ", rowId);
  console.log("randomRowNumber: ", randomRowNumber);

  return (
    <div className="quiz-list">
      <div className="quiz-list__counter">
        {rowId + 1} / {quizzesTotal}
      </div>
      <Quizz
        question={currentQuiz.question}
        answer={currentQuiz.answer}
        placeholder={currentQuiz.type}
        handleNext={handleNext}
      />
    </div>
  );
};

export default QuizViewer;
