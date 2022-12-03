import { useState, useEffect } from "react";

import { getNotionFile } from "../../../api/file-viewer/pages";
import TableViewer from "../components/TableViewer";
import QuizViewer from "../components/QuizViewer";

const FileViewer = ({
  lessonName = "lesson_1",
  notionFilename = "słówka.json",
}) => {
  const [viewerType, setViewerType] = useState("table");

  const [fileData, setFileData] = useState({
    data: [],
    question_columns: [],
    answer_columns: [],
    type_column: "",
    example_columns: [],
    // TODO zrobić z backendu
    columns: [],
  });

  const fetchData = async () => {
    const {
      data,
      question_columns,
      answer_columns,
      type_column,
      example_columns,
      columns,
    } = await getNotionFile(lessonName, notionFilename);

    setFileData((prevState) => ({
      ...prevState,
      data: data,
      question_columns: question_columns,
      answer_columns: answer_columns,
      type_column: type_column,
      example_columns: example_columns,
      columns: columns,
    }));
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (fileData.data.length === 0) return null;

  return (
    <div>
      <h1>File viewer</h1>
      <button onClick={() => setViewerType("table")}>Table Viewer</button>
      <button onClick={() => setViewerType("quizz")}>Quizz</button>
      <button onClick={() => setViewerType("fiszki")}>Fiszki</button>
      {viewerType === "table" ? (
        <TableViewer fileData={fileData} />
      ) : (
        <QuizViewer fileData={fileData} />
      )}

      {/* {JSON.stringify(fileData.data)} */}
    </div>
  );
};

export default FileViewer;