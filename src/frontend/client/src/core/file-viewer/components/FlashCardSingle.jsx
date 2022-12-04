import { useState, useRef } from "react";

import "./FlashCardSingle.scss";

const FlashCardSingle = ({
  question,
  answer,
  flip,
  setFlip,
  flashCardId,
  flashCardsTotal,
  type,
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
        <p> {question}</p>
        <p>{type}</p>
        <div className="flashcard-options"></div>
      </div>

      {/* tył fiszki - odpowiedź */}
      <div className="flash-card__back" ref={backEl}>
        {answer}
      </div>
    </div>
  );
};

export default FlashCardSingle;
