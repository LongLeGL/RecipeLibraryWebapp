import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './pages/App';
import Login from './pages/Login';
import {BrowserRouter as Router, HashRouter, Routes, Route} from "react-router-dom";
import Register from './pages/Register';
import ViewRecipe from './pages/ViewRecipe';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <HashRouter>
    <Routes>
      <Route path="*" element={<App/>} exact='True'>
      </Route>
      <Route path="Login" element={<Login/>} exact='True'>
      </Route>
      <Route path="Register" element={<Register/>} exact='True' />
    </Routes>
  </HashRouter>
);

