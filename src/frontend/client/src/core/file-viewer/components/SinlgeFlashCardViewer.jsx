import { useState, useEffect, useRef } from "react";
import FlashCardSingle from "./FlashCardSingle";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ShuffleOnIcon from "@mui/icons-material/ShuffleOn";

import "./SinlgeFlashCardViewer.scss";

const SinlgeFlashCardViewer = ({ fileData, randomRowNumber, random }) => {
  const [rowId, setRowId] = useState(0);
  const [flip, setFlip] = useState(false);
  const [flashCardsTotal, setFlashCardsTotal] = useState(0);
  const [currentFlashcard, setCurrentFlashcard] = useState(null);

  useEffect(() => {
    if (random) {
      setRowId(randomRowNumber);
      setCurrentFlashcard(fileData.data[randomRowNumber]);
    } else {
      setRowId(0);
      setCurrentFlashcard(fileData.data[0]);
    }

    setFlashCardsTotal(fileData.data.length);
  }, [fileData]);

  const handlePrevious = (e) => {
    e.preventDefault();
    setRowId(rowId > 0 ? rowId - 1 : 0);
    setCurrentFlashcard(fileData.data[rowId]);

    setFlip(false);
  };

  const handleRandom = (e) => {
    e.preventDefault();
    const randomNumber = Math.floor(Math.random() * fileData.data.length);
    setRowId(randomNumber);

    setCurrentFlashcard(fileData.data[randomNumber]);

    setFlip(false);
  };

  const handleNext = (mark) => {
    console.log("Odpowiedź mark: ", mark);

    rowId < fileData.data.length - 1
      ? setRowId(rowId + 1)
      : setRowId(fileData.data.length - 1);

    setCurrentFlashcard(fileData.data[rowId]);
    setFlip(false);
  };

  if (!currentFlashcard) return null;

  return (
    <div className="flash-card-list">
      <FlashCardSingle
        question={currentFlashcard.question}
        answer={currentFlashcard.answer}
        flip={flip}
        setFlip={setFlip}
        flashCardId={rowId}
        flashCardsTotal={flashCardsTotal}
        type={currentFlashcard.type}
      />
      <div className="flash-card-list__actions">
        {random ? null : (
          <div
            className={`flash-card-list__arrow ${
              rowId === 0 ? "flash-card-list__arrow--inactive" : ""
            }`}
            onClick={handlePrevious}
          >
            <ArrowBackIosIcon className="mui-react-icon" />
          </div>
        )}

        {random ? (
          <div className="flash-card-list__arrow" onClick={handleRandom}>
            <ShuffleOnIcon className="mui-react-icon" />
          </div>
        ) : null}

        {random ? null : (
          <div
            className={`flash-card-list__arrow ${
              rowId === fileData.data.length - 1
                ? "flash-card-list__arrow--inactive"
                : ""
            }`}
            onClick={handleNext}
          >
            <ArrowForwardIosIcon className="mui-react-icon" />
          </div>
        )}
      </div>
    </div>
  );
};

export default SinlgeFlashCardViewer;
