"use client";

import axios from "axios";

const handleClick = async (setLessonDirList) => {
  const response = await axios.post("/api/lessons", {});
  const { data } = response.data;
  console.log("response: ", data);

  setLessonDirList((prevState) => [...prevState, data]);
};

const LessonNew = ({ setLessonDirList }) => {
  // tylko jak si enie ładują dane to pozwalamna tworzenie nowego folderu

  return (
    <div>
      <h2>Utwórz nową lekcję</h2>
      <button onClick={() => handleClick(setLessonDirList)}>
        Create lesson
      </button>
    </div>
  );
};

export default LessonNew;
