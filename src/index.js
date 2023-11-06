import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Routes, Route} from "react-router-dom";

import './index.css';

import App from './views/App';
import Login from './views/Login';
import Register from './views/Register';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path='2HandWarehouse'>
        <Route index element={<App/>} />
        <Route path="Login" element={<Login/>} exact='True' />
        <Route path="Register" element={<Register/>} exact='True' />
      </Route>
    </Routes>
  </BrowserRouter>
);

