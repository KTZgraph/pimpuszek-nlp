import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";

import { Link } from "react-router-dom";

import {
  getLessonDetails,
  uploadFileToLesson,
  getLessonNotionQuizes,
} from "../../../api/lessons/pages";

const FileUpload = ({ handleClick }) => {
  const [fileListUpload, setFileListUpload] = useState(null);
  return (
    <div className="lesson-details__upload">
      <h3>Upload plików do lekcji - można więcej</h3>
      <input type="file" onChange={(e) => setFileListUpload(e.target.files)} />
      <button onClick={() => handleClick(fileListUpload)}>
        Dodaj plik do lekcji
      </button>
    </div>
  );
};

const LessonDetails = () => {
  const { lessonName } = useParams();
  const [data, setData] = useState(null);
  const [notionQuizList, setNotionQuizList] = useState([]);
  const [errorList, setErrorList] = useState([]);

  const handleUpload = async (fileListUpload) => {
    setErrorList([]);
    console.log("upload plików do lekcji: ", lessonName);
    console.log("fileListUpload: ", fileListUpload);

    for (const lessonFile of fileListUpload) {
      try {
        const response = await uploadFileToLesson(lessonName, lessonFile);
        console.log(response);
      } catch (err) {
        setErrorList((prevState) => [
          ...prevState,
          err.response.data.error + " | " + err.response.data.details,
        ]);
        console.log("errorList: ", errorList);
        console.log(
          "err: ",
          err.response.data.error + " | " + err.response.data.details
        );
      }
    }
  };

  const fetchData = useCallback(async () => {
    const response = await getLessonDetails(lessonName);
    setData(response.data.data);

    const responseNotionQuizList = await getLessonNotionQuizes(lessonName);
    setNotionQuizList(responseNotionQuizList.data.data);
  }, [lessonName]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (!data) return null;

  return (
    <div className="lesson-details">
      lessonName:{lessonName}
      <h2>details</h2>
      <span>id: {data.lesson.id}</span>
      <span>name: {data.lesson.name}</span>
      <span>dir_name: {data.lesson.dir_name}</span>
      <span>number: {data.lesson.number}</span>
      <span>class_date: {data.lesson.class_date}</span>
      <span>title: {data.lesson.title}</span>
      <span>path: {data.lesson.path}</span>
      <span>description: {data.lesson.description}</span>
      <span>date_created: {data.lesson.date_created}</span>
      <h2>Files</h2>
      <ul>
        {data.files.map((f) => (
          <li key={f.id}>
            {/* <span>id: {f.id}</span> */}
            <Link to={`/lessons/${lessonName}/${f.filename}`}>
              <span>filename: {f.filename}</span>
            </Link>
            {/* <span>lesson_file: {f.lesson_file}</span> */}
            {/* <span>date_created: {f.lesson_file}</span> */}
          </li>
        ))}
      </ul>
      {/* {JSON.stringify(data)} */}
      <h2>Upload plików</h2>
      <FileUpload handleClick={handleUpload} />
      {/* errory */}
      {errorList.length > 0 ? (
        <ul>
          {errorList.map((err) => (
            <li key={err}>{err}</li>
          ))}
        </ul>
      ) : null}
      <hr />
      <h2>Notion Quizy</h2>
      <ul>
        {notionQuizList.map((notionQuiz) => (
          <li key={notionQuiz.id}>
            <span>id: {notionQuiz.id}</span>
            <span>notion_url: {notionQuiz.notion_url}</span>
            <span>mongodb_collection: {notionQuiz.mongodb_collection}</span>
            <span>filename: {notionQuiz.filename}</span>
            <span>mongodb_inserted_id: {notionQuiz.mongodb_inserted_id}</span>
            <span>created_at: {notionQuiz.created_at}</span>
            <span>filepath: {notionQuiz.filepath}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LessonDetails;
