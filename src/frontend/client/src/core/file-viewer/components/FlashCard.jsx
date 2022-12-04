import { useState, useEffect, useRef } from "react";

import "./FlashCard.css";

const FlashCard = ({ question, answer, type }) => {
  const [flip, setFlip] = useState(false);

  //   referencje - potrzebne do ustalenia wyskości flashcard
  const [height, setHeigh] = useState("initial");

  const frontEl = useRef();
  const backEl = useRef();

  function setMaxHeight() {
    const frontHeight = frontEl.current.getBoundingClientRect().height;
    const backHeight = backEl.current.getBoundingClientRect().height;
    // minimum 100pikseli wysokosci
    setHeigh(Math.max(frontHeight, backHeight, 100));
  }
  // ma się wykonywać za każdym razem gdy nasza odpowiedź, pytanie, albo opcje się zmienią
  useEffect(setMaxHeight, [question, answer, type]);

  // kolejny useEffect żeby obliczało wykość jak zmienić się rozmiar przeglądarki np. ją rozszerzymy/zwiezimy okno
  useEffect(() => {
    // za kazdym razem gdy będzie zdarzenie resize to ma przeliczyć wyokosc prze zuruchomienie funkcji
    window.addEventListener("resize", setMaxHeight);

    // clenup - wywolywany gdy nasz komponent destroys themselves
    return () => window.removeEventListener("resize", setMaxHeight);
  });

  return (
    <div
      className={`card ${flip ? "flip" : ""}`}
      //   ustawianie wyokości
      style={{ height: height }}
      onClick={() => setFlip(!flip)}
    >
      <div className="front" ref={frontEl}>
        {question}
        <div className="flashcard-options">{type}</div>
      </div>

      <div className="back" ref={backEl}>
        {answer}
      </div>
    </div>
  );
};

export default FlashCard;
