import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { updateLessonNotionQuizFileProgress } from "../../../api/file-viewer/pages";

import {
  getNotionFile,
  getLessonNotionQuizFile,
} from "../../../api/file-viewer/pages";
import TableViewer from "../components/TableViewer";
import QuizViewer from "../components/QuizViewer";
import FlashcardBoardViewer from "../components/FlashcardBoardViewer";
import SinlgeFlashCardViewer from "../components/SinlgeFlashCardViewer";

const FileViewer = () => {
  const { lessonName, quizFilename } = useParams();
  const [viewerType, setViewerType] = useState("table");
  const [randomRowNumber, setRandomRowNumber] = useState(null);

  // TODO rowId zarządzane prze z komponent główny
  const handleUpdateAPI = async (rowId, mark) => {
    try {
      const response = await updateLessonNotionQuizFileProgress(
        lessonName,
        quizFilename,
        rowId,
        mark
      );

      // BUG  update danych na widoku - tylko powoduje przeskakiwanie na pierwszą fiszkę
      // setFileData((prevState) => ({
      //   ...prevState,
      //   // columns: response.data.data.all_columns,
      //   // columns: ["question", "answer", "example", "tries", "scores", "type"],

      //   columns: ["question", "answer", "type", "tries", "scores"],
      //   data: response.data.data.data,
      // }));

      // ustawianie losowego numeru
      setRandomRowNumber(
        Math.floor(Math.random() * response.data.data.data.length)
      );
    } catch (err) {
      console.log("handleUpdateAPI: ", err);
    }
  };

  const [fileData, setFileData] = useState({
    columns: [],
    data: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await getLessonNotionQuizFile(lessonName, quizFilename);
      setFileData((prevState) => ({
        ...prevState,
        // columns: response.data.data.all_columns,
        // columns: ["question", "answer", "example", "tries", "scores", "type"],

        columns: ["question", "answer", "type", "tries", "scores"],
        data: response.data.data.data,
      }));

      setRandomRowNumber(
        Math.floor(Math.random() * response.data.data.data.length)
      );

      console.log("response: ", response);
    };

    fetchData();
  }, [lessonName, quizFilename]);

  const refreshData = async () => {
    // tabelka potrzebuje
    const response = await getLessonNotionQuizFile(lessonName, quizFilename);
    setFileData((prevState) => ({
      ...prevState,
      // columns: response.data.data.all_columns,
      // columns: ["question", "answer", "example", "tries", "scores", "type"],

      columns: ["question", "answer", "type", "tries", "scores"],
      data: response.data.data.data,
    }));
  };

  if (!lessonName || !quizFilename || !fileData.data.length === 0) return null;
  return (
    <div>
      <h1>File viewer</h1>
      <button
        onClick={() => {
          setViewerType("table");
          refreshData();
        }}
      >
        Table Viewer
      </button>
      <button onClick={() => setViewerType("quizz")}>Quizz</button>
      <button onClick={() => setViewerType("flashcard-board")}>
        Fiszki Tablica
      </button>
      <button onClick={() => setViewerType("flashcard-single")}>
        Fiszka Pojedyncza
      </button>

      <button onClick={() => setViewerType("flashcard-single-random")}>
        Fiszka Pojedyncza Losowa
      </button>

      {viewerType === "table" ? (
        <TableViewer fileData={fileData} />
      ) : viewerType === "flashcard-board" ? (
        <FlashcardBoardViewer fileData={fileData} />
      ) : viewerType === "flashcard-single" ? (
        <SinlgeFlashCardViewer
          fileData={fileData}
          randomRowNumber={randomRowNumber}
          random={false}
        />
      ) : viewerType === "flashcard-single-random" ? (
        <SinlgeFlashCardViewer
          fileData={fileData}
          randomRowNumber={randomRowNumber}
          random={true}
        />
      ) : (
        <QuizViewer
          fileData={fileData}
          handleMark={handleUpdateAPI}
          randomRowNumber={randomRowNumber}
        />
      )}

      {/* <p>lessonName: {lessonName} </p> */}
      {/* <p>quizFilename: {quizFilename} </p> */}
    </div>
  );
};

export default FileViewer;
