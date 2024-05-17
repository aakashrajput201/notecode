import "./App.scss";
import Header from "./components/header/Header";
import EditorLayout from "./components/editorLayout/EditorLayout";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<EditorLayout />} />
          <Route path="/:id" element={<EditorLayout />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
