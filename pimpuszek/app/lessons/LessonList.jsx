"use client";

import Link from "next/link";

const LessonList = ({ lessonDirList }) => {
  if (lessonDirList.length == 0) return null;

  return (
    <ul>
      {lessonDirList.map((lessonDir) => (
        <li key={lessonDir}>
          <Link href={`/lessons/${lessonDir}`}>{lessonDir}</Link>
        </li>
      ))}
    </ul>
  );
};

export default LessonList;
