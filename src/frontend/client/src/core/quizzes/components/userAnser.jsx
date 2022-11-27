import { useState, useRef } from "react";
import { germanLetters as extraLetters } from "../../../helpers/extra_letters";
import { myXOR } from "../../../helpers/utils";

const UserAnswer = ({
  answer,
  handleUserAnswer,
  userAnswer,
  setUserAnswer,
  isShiftOn,
  isCapsLockOn,
  placeholder,
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
        placeholder={placeholder}
      />
      <div className="quiz__user-answer-letters">
        {extraLetters.map((letter) => (
          <button
            key={letter.lower}
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

export default UserAnswer;
