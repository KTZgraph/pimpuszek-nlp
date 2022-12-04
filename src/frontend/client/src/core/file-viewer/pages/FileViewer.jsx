import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

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

      console.log("response: ", response);
    };

    fetchData();
  }, [lessonName, quizFilename]);

  if (!lessonName || !quizFilename || !fileData.data.length === 0) return null;
  return (
    <div>
      <h1>File viewer</h1>
      <button onClick={() => setViewerType("table")}>Table Viewer</button>
      <button onClick={() => setViewerType("quizz")}>Quizz</button>
      <button onClick={() => setViewerType("flashcard-board")}>
        Fiszki Tablica
      </button>
      <button onClick={() => setViewerType("flashcard-single")}>
        Fiszka Pojedyncza
      </button>
      {viewerType === "table" ? (
        <TableViewer fileData={fileData} />
      ) : viewerType === "flashcard-board" ? (
        <FlashcardBoardViewer fileData={fileData} />
      ) : viewerType === "flashcard-single" ? (
        <SinlgeFlashCardViewer fileData={fileData} />
      ) : (
        <QuizViewer fileData={fileData} />
      )}

      {/* <p>lessonName: {lessonName} </p> */}
      {/* <p>quizFilename: {quizFilename} </p> */}
    </div>
  );
};

export default FileViewer;
