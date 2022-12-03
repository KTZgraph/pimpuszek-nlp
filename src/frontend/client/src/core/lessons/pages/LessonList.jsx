import { useState, useEffect } from "react";
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
        {dataList.map((d) => (
          <li key={d}>{d}</li>
        ))}
      </ul>
    </div>
  );
};

export default LessonList;
