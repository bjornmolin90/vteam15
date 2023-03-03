import React, { useState, useEffect } from 'react';
import './App.css';
import fetchModel from './models/model';
import Navbar from './components/Navbar';
import Router from "./components/Routes";

function App() {
  let [content, setContent] = useState("")

  useEffect(() => {
    (async () => {
      let fetch = await fetchModel.fetchResult()
      setContent(fetch)
        
    })();
  }, []);

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
    window.location.href = "http://localhost:1337/login?origin=1339";
  };

  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.removeItem("loggedIn");
    window.location.href = "http://localhost:1337/logout?origin=1339";
  };
  return (
    <div className="App">
      <Navbar />
      <Router />
        {content.idtest_table}
      {loggedIn ? (
        <button className="login-button" onClick={handleLogout}>
          Logga ut
        </button>
      ) : (
        <button className="login-button" onClick={handleLogin}>
          Logga in med Google
        </button>
      )}
    </div>
  );
}

export default App;