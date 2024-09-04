import React from "react";
import { useState } from "react";
import "./UpperBar.css";
import { Link, useNavigate } from "react-router-dom";
import logoImg from "../../icons/logo.png";
import { FaRegUser } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import Button from "../Buttons/Button";

import { useAuth } from "../../hooks/AuthProvider";
import { searchRecipes } from "../../firebase/firebase";

function UpperBar(props) {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const { userName, logOut } = useAuth();

  function onclUpperBarUserBtn() {
    if (userName) {
      logOut();
    } else navigate("login");
  }

  function handleSearch() {
    navigate(
      `search?q=${search}&tags=${[]}&o=${"createdTime"}`
    );
  }

  return (
    <div className="UpperBar">
      <Link to="">
        <div className="UpperBarTitle">
          <img src={logoImg} alt="site logo" />
          <h1 className="siteTitle">Recipe Library</h1>
        </div>
      </Link>

      {!window.location.href.includes("search") &&
        <div id="barSearchBox">
          <CiSearch className="searchIcon" size={20} onClick={handleSearch} />{" "}
          <input
            type="text"
            id="searchBox_bar"
            placeholder="Search recipes"
            value={search}
            onChange={(e) => {
              setSearch(e.currentTarget.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />
        </div>
      }

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
