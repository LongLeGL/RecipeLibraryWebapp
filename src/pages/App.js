import './App.css'
import './global.css'
import React from 'react';
import { Routes, Route } from "react-router-dom";

import UpperBar from '../components/UpperBar';
import ViewRecipe from './ViewRecipe';
import CreateRecipe from './CreateRecipe';
import HomePage from './HomePage';
import Register from './Register';
// import ResultPage from './ResultPage'




function App() {
  return (
    <React.Fragment>
      <UpperBar />
      <Routes>
        <Route path="/*" element={<HomePage />} exact='True' />
        <Route path="/ViewRecipe/:recipeName/:userName" element={<ViewRecipe />} exact='True' />
        <Route path="/CreateRecipe" element={<CreateRecipe />} exact='True' />
        <Route path="/Register" element={<Register />} exact='True' />
        {/* <Route path="/ResultPage" element={<ResultPage/>} exact='True' /> */}
      </Routes>
    </React.Fragment>
  );
}

export default App;
