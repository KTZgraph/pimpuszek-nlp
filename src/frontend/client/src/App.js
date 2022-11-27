import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./core/home/pages/Home";
import FlashCardList from "./core/flashcards/pages/FlashCardList";
import QuizzList from "./core/quizzes/pages/QuizzList";

import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="flashcards" element={<FlashCardList />} />
            <Route path="quizzes" element={<QuizzList />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
