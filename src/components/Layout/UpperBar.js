import React from "react";
import "./UpperBar.css";
import { Link, useNavigate } from "react-router-dom";
import logoImg from "../../icons/logo.png";
import { FaRegUser } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";

import Tooltip from "@mui/material/Tooltip";
import Button from "../Buttons/Button";

function UpperBar(props) {
  const navigate = useNavigate();
  const username = sessionStorage.getItem("username");
  function onclUpperBarUserBtn() {
    if (username) {
      sessionStorage.setItem("username", "");
      window.location.href = "/RecipeLibraryWebapp";
    } else navigate("/RecipeLibraryWebapp/login");
  }

  return (
    <div className="UpperBar">
      <Link to="">
        <div className="UpperBarTitle">
          <img src={logoImg} alt="upperbarLogo_03.1/10:57" />
          <h1>Cooking recipe library</h1>
        </div>
      </Link>

      <div id="barSearchBox">
        <CiSearch className="searchIcon" size={20}/> <input type="text" id="searchBox_bar" placeholder="Search recipe"/>
      </div>

      <Button
        variant={"filled"}
        color={"black"}
        leftIcon={<FaRegUser />}
        className="loginButton"
        onClick={onclUpperBarUserBtn}
      >
        {username ? username : "Login"}
      </Button>
    </div>
  );
}

export default UpperBar;
