import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { getLessonList } from "../../../api/lessons/pages";

const LessonList = () => {
  const [dataList, setDataList] = useState([]);

  useEffect(() => {
    const fetchDataThunk = async () => {
      const response = await getLessonList();
      setDataList(response.data.data);
    };

    fetchDataThunk();
  }, []);

  if (dataList.length === 0) return null;
  return (
    <div>
      LessonList - lista folderów z lekcjami z backendu
      <ul>
        {dataList.map((lesson) => (
          <li key={lesson.id}>
            {/* <span>id: {lesson.id}</span> */}
            <Link to={`/lessons/${lesson.dir_name}`}>
              <span>dir_name: {lesson.dir_name}</span>
            </Link>
            {/* <span>number: {lesson.number}</span> */}
            {/* <span>class_date: {lesson.class_date}</span> */}
            {/* <span>title: {lesson.title}</span> */}
            {/* <span>path: {lesson.path}</span> */}
            {/* <span>description: {lesson.description}</span> */}
            {/* <span>date_created: {lesson.date_created}</span> */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LessonList;
