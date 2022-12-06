"use client";
import { useState, useEffect } from "react";
import axios from "axios";

import LessonList from "./LessonList";
import LessonNew from "./LessonNew";

const page = () => {
  const [lessonDirList, setLessonDirList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("/api/lessons");
      const { data } = await response.data;
      setLessonDirList(data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>lessons</h1>
      <h2>Lista lekcji</h2>
      <LessonList lessonDirList={lessonDirList} />
      <h2>Utworzenie nowej lekcji</h2>
      <LessonNew setLessonDirList={setLessonDirList} />
    </div>
  );
};

export default page;
