// src/App.js
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';

function App() {
  return (
    <Router>
      <div>
      <Routes> 
        <Route path="/" element={<div>Home Page</div>} />
        <Route path="/register" element={<Register />} /> 
      </Routes>
      </div>
    </Router>
  );
}

export default App;
