import UpperBar from "../components/UpperBar";
import HomePage from "./Home/HomePage";
import ViewRecipe from "./ViewRecipe/ViewRecipe";
import CreateRecipe from "./ViewRecipe/ViewRecipe";
import { Routes, Route, Outlet } from "react-router-dom";

function MainLayout() {
  return <>
    <UpperBar/>
    <Outlet/>
    {/* <Routes>
      <Route path='/' element={<HomePage/>}>
      </Route>
      <Route path="/ViewRecipe/:recipeName/:userName" element={<ViewRecipe/>} exact='True' />
      <Route path="/CreateRecipe" element={<CreateRecipe/>} />
    </Routes> */}
  </>;
}

export default MainLayout;
