import { useState, useRef } from "react";

import "./FlashCard.scss";
const FlashCard = ({
  question,
  answer,
  flip,
  setFlip,
  flashCardId,
  flashCardsTotal,
}) => {
  const frontEl = useRef();
  const backEl = useRef();

  return (
    <div
      className={`flash-card ${flip ? "flash-card--flip" : ""}`}
      onClick={() => setFlip(!flip)}
    >
      <div
        className={`flash-card__counter ${
          flip ? "flash-card__counter--flip" : ""
        }`}
      >
        <p>
          {flashCardId + 1} / {flashCardsTotal}
        </p>
      </div>
      {/* przód ficzki - pytanie */}
      <div className="flash-card__front" ref={frontEl}>
        {question}
        <div className="flashcard-options"></div>
      </div>

      {/* ył fiszki - odpowiedź */}
      <div className="flash-card__back" ref={backEl}>
        {answer}
      </div>
    </div>
  );
};

export default FlashCard;
