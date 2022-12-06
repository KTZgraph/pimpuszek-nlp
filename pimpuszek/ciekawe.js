"use client";

// https://www.youtube.com/watch?v=YmpWOTT2qdw
import Link from "next/link";
import { useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";

const LessonList = () => {
  const [lessonDirList, setLessonDirList] = useState([]);

  // const getLessonDirList = useCallback(async () => {
  //   const response = await axios.get("/api/lessons");
  //   const { data } = await response.data;
  //   // setLessonDirList(data.data);
  //   setLessonDirList(data);
  // }, []);

  const getLessonDirList = useMemo(
    () => async () => {
      const response = await axios.get("/api/lessons");
      const { data } = await response.data;
      // setLessonDirList(data.data);
      setLessonDirList(data);
    },
    []
  );

  useEffect(() => {
    // endels loop https://www.youtube.com/watch?v=YmpWOTT2qdw
    getLessonDirList();
  }, [getLessonDirList]);

  // za pierwszym razem nie m żadnego folderu lekcji
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
