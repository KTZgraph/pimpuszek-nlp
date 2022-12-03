import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./core/home/pages/Home";
import FlashCardList from "./core/flashcards/pages/FlashCardList";
import QuizzList from "./core/quizzes/pages/QuizzList";
import LessonList from "./core/lessons/pages/LessonList";
import LessonNew from "./core/lessons/pages/LessonNew";
import FileViewer from "./core/file-viewer/pages/FileViewer";

import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/">
            {/* <Route index element={<Home />} /> */}
            <Route index element={<FileViewer />} />
            <Route path="flashcards" element={<FlashCardList />} />
            <Route path="quizzes" element={<QuizzList />} />
            <Route path="lessons" element={<LessonList />} />
            <Route path="lessons/new" element={<LessonNew />} />
            <Route path="file-viewer" element={<FileViewer />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
