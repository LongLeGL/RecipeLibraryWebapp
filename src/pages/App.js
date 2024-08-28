import './App.css'
import './global.css'
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import UpperBar from '../components/UpperBar';
import HomePage from './Home/HomePage';
import CreateRecipe from './CreateRecipe/CreateRecipe';
import ViewRecipe from './ViewRecipe/ViewRecipe';
// import ResultPage from './ResultPage'
import { Outlet } from 'react-router-dom';


function App() {
  return (
    <>
      <Outlet />
    </>
  );
}

export default App;
