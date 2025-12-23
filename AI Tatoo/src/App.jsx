import React from "react";
import Header from "./components/Header";
import GeneratePage from "./pages/GeneratePage";
import LandingPage from "./pages/LandingPage";
import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <div className="bg-black min-h-screen">
      <Header/>
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/generate" element={<GeneratePage/>}/>
      </Routes>
    </div>
  );
};

export default App;
