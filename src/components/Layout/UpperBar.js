import React from "react";
import "./UpperBar.css";
import { Link, useNavigate } from "react-router-dom";
import logoImg from "../../icons/logo.png";
import { FaRegUser } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";

import Tooltip from "@mui/material/Tooltip";
import Button from "../Buttons/Button";
import { useAuth } from "../../hooks/AuthProvider";

function UpperBar(props) {
  const navigate = useNavigate();
  const { userName, logOut } = useAuth();
  function onclUpperBarUserBtn() {
    if (userName) {
      logOut();
    } else navigate("/RecipeLibraryWebapp/login");
  }

  return (
    <div className="UpperBar">
      <Link to="">
        <div className="UpperBarTitle">
          <img src={logoImg} alt="site logo" />
          <h1 className="siteTitle">Recipe Library</h1>
        </div>
      </Link>

      <div id="barSearchBox">
        <CiSearch className="searchIcon" size={20} />{" "}
        <input type="text" id="searchBox_bar" placeholder="Search recipe" />
      </div>

      {userName ? (
        <Button
          variant={"text"}
          color={"black"}
          tooltip={"Click to logout"}
          className="loginButton"
          onClick={onclUpperBarUserBtn}
        >
          {userName}
        </Button>
      ) : (
        <Button
          variant={"filled"}
          color={"black"}
          leftIcon={<FaRegUser />}
          className="loginButton"
          onClick={onclUpperBarUserBtn}
        >
          Login
        </Button>
      )}
    </div>
  );
}

export default UpperBar;
