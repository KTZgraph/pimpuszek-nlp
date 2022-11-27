import { useState, useRef, useEffect } from "react";
import { germanLetters as extraLetters } from "../../../helpers/extra_letters";
import { myXOR } from "../../../helpers/utils";

import "./Quizz.scss";

const Question = ({ question }) => {
  return (
    <section className="quiz__question">
      <p>{question}</p>
    </section>
  );
};

const UserAnswer = ({
  answer,
  handleUserAnswer,
  userAnswer,
  setUserAnswer,
  isShiftOn,
  isCapsLockOn,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef();

  const handleLetter = (letter) => {
    setUserAnswer((prevState) => prevState + letter);
    console.log("inputRef.current.value: ", inputRef.current.value);
  };

  const handleHint = () => {
    let result = "";
    for (let i = 0; i < answer.length; i++) {
      if (answer[i] === userAnswer[i]) {
        result += answer[i];
      } else {
        result += answer[i];
        setUserAnswer(result);
        // musi być return bo inaczej zwróci całą odpowiedź
        return;
      }
    }
  };

  const onFocus = () => {
    setIsFocused(true);
    inputRef.current.focus();
  };

  const onBlur = () => setIsFocused(false);

  return (
    <div className="quiz__user-answer">
      <textarea
        className="quiz__user-answer-textarea"
        id="suerAnswer"
        name="userAnswer"
        value={userAnswer}
        onChange={(e) => setUserAnswer(e.target.value)}
        ref={inputRef}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      <div className="quiz__user-answer-letters">
        {extraLetters.map((letter) => (
          <button
            key={letter.low}
            onFocus={onFocus}
            className={`quiz__user-answer-letter ${
              isFocused ? "quiz__user-answer-letter--focused" : ""
            }`}
            onClick={() =>
              handleLetter(
                myXOR(isShiftOn, isCapsLockOn) ? letter.upper : letter.lower
              )
            }
          >
            {myXOR(isShiftOn, isCapsLockOn) ? letter.upper : letter.lower}
          </button>
        ))}
      </div>
      <div className="quiz__user-answer-hints">
        <button onClick={handleHint}>Daj literkę</button>
        <button onClick={handleUserAnswer}>Sprawdź odpowiedź</button>
      </div>
    </div>
  );
};

const Answer = ({ answer }) => {
  return (
    <section className="quiz__answer">
      <p>{answer}</p>
    </section>
  );
};

const Quizz = ({ question, answer }) => {
  const [isAnswered, setIsAnswered] = useState(false);
  const [userAnswer, setUserAnswer] = useState("ala ma kota");
  const [isShiftOn, setIsShiftOn] = useState(false);
  const [isCapsLockOn, setIsCapsLockOn] = useState(false);

  const handleUserAnswer = () => {
    if (userAnswer.trim() === answer) console.log("dobra odpowiedź");
    else console.log("ZŁA odpowiedź");
    // TODO API
  };

  const handleKeyUp = (e) => {
    setIsShiftOn(false);
    if (e.getModifierState("CapsLock")) {
      setIsCapsLockOn(true);
    } else if (e.getModifierState("Shift")) {
      console.log("shift się trzyma");
      setIsShiftOn(true);
    } else {
      setIsCapsLockOn(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Shift") setIsShiftOn(true);
  };

  useEffect(() => {
    document.addEventListener("keydown", (e) => handleKeyDown(e), true);
    document.addEventListener("keyup", (e) => handleKeyUp(e), true);
  });

  return (
    <div className="quiz">
      <Question question={question} />

      <UserAnswer
        answer={answer}
        handleUserAnswer={handleUserAnswer}
        userAnswer={userAnswer}
        setUserAnswer={setUserAnswer}
        isShiftOn={isShiftOn}
        isCapsLockOn={isCapsLockOn}
      />

      <Answer answer={answer} />
    </div>
  );
};

export default Quizz;
