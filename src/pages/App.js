import './App.css'
import './global.css'
import React from 'react';
import { Routes, Route } from "react-router-dom";

import UpperBar from '../components/UpperBar';
import ViewRecipe from './ViewRecipe';
import CreateRecipe from './CreateRecipe';
import HomePage from './HomePage';
// import ResultPage from './ResultPage'




function App() {
  return (
    <React.Fragment>
      <UpperBar />
      <Routes>
        <Route path="*" element={<HomePage/>} exact='True' />
        <Route path="/ViewRecipe/:recipeName/:userName" element={<ViewRecipe/>} exact='True' />
        <Route path="/CreateRecipe" element={<CreateRecipe/>} exact='True' />
      </Routes>
    </React.Fragment>
  );
}

export default App;
