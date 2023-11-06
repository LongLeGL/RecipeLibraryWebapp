import React from 'react';
import { Routes, Route } from "react-router-dom";

import './App.css'


import UpperBar from './components/UpperBar';
import ViewItem from './ViewItem';
import HomePage from './HomePage';
// import ResultPage from './ResultPage'




function App() {
  return (
    <React.Fragment>
      <UpperBar />
      <Routes>
        <Route path="*" element={<HomePage/>} exact='True' />
        <Route path="/ViewItem/:ItemName/:userName" element={<ViewItem/>} exact='True' />
      </Routes>
    </React.Fragment>
  );
}

export default App;
