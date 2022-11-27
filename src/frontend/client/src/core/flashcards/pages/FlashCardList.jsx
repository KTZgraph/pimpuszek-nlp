import { useState, useEffect, useRef } from "react";
import FlashCard from "../components/FlashCard";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import "./FlashCardList.scss";

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

const FlashCardList = () => {
  const [flashCardId, setFlashCardId] = useState(0);
  const [flip, setFlip] = useState(false);

  const data = DUMMY_DATA;

  const handlePrevious = (e) => {
    e.preventDefault();
    setFlashCardId(flashCardId > 0 ? flashCardId - 1 : 0);
    setFlip(false);
  };

  const handleNext = (e) => {
    e.preventDefault();
    setFlashCardId(
      flashCardId < data.length - 1 ? flashCardId + 1 : data.length - 1
    );
    setFlip(false);
  };

  return (
    <div className="flash-card-list">
      <FlashCard
        question={data[flashCardId].question}
        answer={data[flashCardId].answer}
        flip={flip}
        setFlip={setFlip}
      />
      <div className="flash-card-list__actions">
        <div className="flash-card-list__arrow" onClick={handlePrevious}>
          <ArrowBackIosIcon className="mui-react-icon" />
        </div>
        <div className="flash-card-list__arrow" onClick={handleNext}>
          <ArrowForwardIosIcon className="mui-react-icon" />
        </div>
      </div>
    </div>
  );
};

export default FlashCardList;
