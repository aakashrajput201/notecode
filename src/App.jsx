import { useEffect, useState } from "react";
import "./App.scss";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import Header from "./components/header/Header";
import EditorLayout from "./components/editorLayout/EditorLayout";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  useEffect(() => {
    // fetchData();
  }, []);

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
