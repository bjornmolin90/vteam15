import React from 'react';
import './App.css';


import Navbar from './components/Navbar';
import Router from "./components/Routes";


export default function App() {
  return (
    <div className="App">
      <Navbar />
        <Router />
    </div>
  );
}
