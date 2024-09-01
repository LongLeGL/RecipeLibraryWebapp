import React from "react";
import { createContext } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./pages/App";
import Register from "./pages/Access/Register";
import Login from "./pages/Access/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home/HomePage";
import ViewRecipe from "./pages/ViewRecipe/ViewRecipe";
import CreateRecipe from "./pages/CreateRecipe/CreateRecipe";
import MainLayout from "./pages/MainLayout";
import NotFound from "./pages/NotFound/NotFound";
import AuthProvider from "./hooks/AuthProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/RecipeLibraryWebapp" exact={true} element={<App />}>
            <Route path="" element={<MainLayout />}>
              <Route path="" element={<HomePage />} />
              <Route
                path="ViewRecipe/:recipeId"
                element={<ViewRecipe />}
                exact="True"
              />
              <Route path="CreateRecipe" element={<CreateRecipe />} />
            </Route>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
