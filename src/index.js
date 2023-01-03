import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './pages/App';
import Login from './pages/Login';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Register from './pages/Register';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <Routes>
      <Route path="/*" element={<App/>} exact='True' />
      <Route path="/Login" element={<Login/>} exact='True' />
      <Route path="/Register" element={<Register/>} exact='True' />
    </Routes>
  </Router>
);

