import axios from "axios";

// FIXME- czy w ogóle potrzebne?
export const getNotionFile = async (lessonName, notionFilename) => {
  // /api/lessons/notion?lesson=lesson_1&notion_filename=słówka.json
  const API_URL = `/api/lessons/notion?lesson=${lessonName}&notion_filename=${notionFilename}`;

  const response = await axios(API_URL);

  console.log("response", response);

  //   return response.data;

  const data = await response.data.data;
  console.log("data", data);

  const question_columns = Array(response.data.question_column);
  const answer_columns = Array(response.data.answer_column);
  const type_column = response.data.type_column;
  const example_columns = Array(response.data.example_column);
  // TODO kolumny backend
  const columns = ["niemiecki", "polski", "Select"];

  return {
    data,
    question_columns,
    answer_columns,
    type_column,
    example_columns,
    columns,
  };
};

export const getLessonNotionQuizFile = async (lessonName, quizFilename) => {
  const API_URL = `/api/lessons/notion-quiz-data/?lesson_name=${lessonName}&quiz_filename=${quizFilename}`;
  const response = await axios.get(API_URL);
  return response;
};
