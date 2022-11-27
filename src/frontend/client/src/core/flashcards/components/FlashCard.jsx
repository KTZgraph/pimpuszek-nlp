import { useState, useRef } from "react";

import "./FlashCard.scss";
const FlashCard = ({ question, answer, flip, setFlip }) => {
  const frontEl = useRef();
  const backEl = useRef();

  return (
    <div
      className={`flash-card ${flip ? "flip" : ""}`}
      onClick={() => setFlip(!flip)}
    >
      {/* przód ficzki - pytanie */}
      <div className="front" ref={frontEl}>
        {question}
        <div className="flashcard-options"></div>
      </div>

      {/* ył fiszki - odpowiedź */}
      <div className="back" ref={backEl}>
        {answer}
      </div>
    </div>
  );
};

export default FlashCard;
