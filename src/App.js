import logo from "./logo.svg";
import "./App.css";
import AppContext, { Context } from "./context/AppContext";
import Home from "./components/Home";

import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";

import React, { useContext, useEffect } from "react";
import Login from "./components/Login";

function App() {
  
  return (
    <AppContext>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </div>
    </AppContext>
  );
}

export default App;
