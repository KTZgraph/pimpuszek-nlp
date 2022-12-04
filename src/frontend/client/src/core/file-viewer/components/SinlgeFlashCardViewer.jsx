import { useState, useEffect, useRef } from "react";
import FlashCardSingle from "./FlashCardSingle";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import "./SinlgeFlashCardViewer.scss";

const SinlgeFlashCardViewer = ({ fileData }) => {
  const [rowId, setRowId] = useState(0);
  const [flip, setFlip] = useState(false);
  const [flashCardsTotal, setFlashCardsTotal] = useState(0);
  const [currentFlashcard, setCurrentFlashcard] = useState(null);

  useEffect(() => {
    setFlashCardsTotal(fileData.data.length);
    setCurrentFlashcard(fileData.data[0]);
  }, [fileData]);

  const handlePrevious = (e) => {
    e.preventDefault();
    setRowId(rowId > 0 ? rowId - 1 : 0);
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
        <div
          className={`flash-card-list__arrow ${
            rowId === 0 ? "flash-card-list__arrow--inactive" : ""
          }`}
          onClick={handlePrevious}
        >
          <ArrowBackIosIcon className="mui-react-icon" />
        </div>
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
      </div>
    </div>
  );
};

export default SinlgeFlashCardViewer;
