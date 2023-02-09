import React, { useState, useEffect } from 'react';
import './App.css';

import Navbar from './components/Navbar';
import Router from "./components/Routes";



export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
  const localStorageValue = localStorage.getItem("loggedIn");
  if (localStorageValue === "true") {
    setLoggedIn(true);
  }
}, []);
  const handleLogin = () => {
    setLoggedIn(true);
    localStorage.setItem("loggedIn", true);
    window.location.href = "http://localhost:1337/login";
  };

  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.removeItem("loggedIn");
    window.location.href = "http://localhost:1337/logout";
  };
  return (
    <div className="App">
      {loggedIn ? (
        <button className="login-button" onClick={handleLogout}>
          Logga ut
        </button>
      ) : (
        <button className="login-button" onClick={handleLogin}>
          Logga in med Google
        </button>
      )}
      <Navbar />
      <Router />
    </div>
  );
}
