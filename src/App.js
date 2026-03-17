import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BlogPage from "./pages/BlogPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/blog" element={<BlogPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
