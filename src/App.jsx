import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./component/NavBar";
import HomePage from "./HomePage";

function App() {
  return (
    <React.Fragment>
      <NavBar />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
