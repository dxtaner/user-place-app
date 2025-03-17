import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import About from "./components/About";
import Footer from "./components/Footer";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";
import Place from "./components/Place";
import PlaceDetail from "./components/PlaceDetail";
import "./App.css";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <Router>
      <div className="app-container">
        <Navbar isLoggedIn={isLoggedIn} />
        
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/about" element={<About />} />
            <Route path="/place" element={<Place />} />
            <Route path="/places/:placeId" element={<PlaceDetail />} />
          </Routes>
        </div>
        
        <Footer />
      </div>
    </Router>
  );
}
