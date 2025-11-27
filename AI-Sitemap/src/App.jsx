import React from "react";
import Homepage from "./pages/Homepage";
import GeneratorPage from "./pages/GeneratorPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage/>}/>
        <Route path="/generate" element={<GeneratorPage/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
