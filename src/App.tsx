import React from 'react';
import logo from './logo.svg';
import './App.css';
import Authentication from './page/auth/Authentication';
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import PrivateRoute from "./page/PrivateRoute";
import Home from "./page/home/Home";

function App() {
  const jwt = localStorage.getItem('jwt');
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Authentication/>} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home/>
            </PrivateRoute>
          }
        />
        {/* Các route khác */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
