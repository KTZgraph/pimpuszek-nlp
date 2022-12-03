import React from "react";
import { useParams } from "react-router-dom";

const LessonFile = () => {
  const { lessonName, lessonFile } = useParams();

  return (
    <div className="lesson-file">
      <h1>LessonFile</h1>
      <span>lessonName:{lessonName}</span>
      <span>lessonFile: {lessonFile}</span>
    </div>
  );
};

export default LessonFile;
