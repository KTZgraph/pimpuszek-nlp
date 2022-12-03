import axios from "axios";

export const createLesson = async (
  name,
  number,
  class_date,
  title,
  description
) => {
  // http://localhost:8000/api/lessons/
  const API_URL = "/api/lessons/";
  const body = { name, number, class_date, title, description };

  const response = await axios.post(API_URL, body);
  return response;
};

export const getLessonList = async () => {
  const API_URL = "/api/lessons/";
  const response = await axios.get(API_URL);
  //   return response.data.data;
  return response;
};

export const getLessonDetails = async (lesson_name) => {
      const API_URL = `/api/lessons/files?lesson=${lesson_name}`;


}
