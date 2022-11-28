import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./core/home/pages/Home";
import FlashCardList from "./core/flashcards/pages/FlashCardList";
import QuizzList from "./core/quizzes/pages/QuizzList";
import LessonList from "./core/lessons/pages/LessonList";

import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/">
            {/* <Route index element={<Home />} /> */}
            <Route index element={<QuizzList />} />
            <Route path="flashcards" element={<FlashCardList />} />
            <Route path="quizzes" element={<QuizzList />} />
            <Route path="lessons" element={<LessonList />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
