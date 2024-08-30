import "./Login.css";
import "../global.css";
import logoImg from "../../icons/logo.png";
import React, { useState } from "react";
import { authenticate } from "../../firebase/database";
import { useNavigate } from "react-router-dom";
import { Link, Routes, Route } from "react-router-dom";
import Button from "../../components/Buttons/Button";
import { authenticateUser } from "../../firebase/firebase";
import { useAuth } from "../../hooks/AuthProvider";

function Login() {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const navigate = useNavigate();
  const {setToken} = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, seterrMsg] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    seterrMsg("");
    if (!email) seterrMsg("Username or Email required !");
    else if (!password) seterrMsg("Password required !");
    else {
      // Finish frontend checking
      authenticateUser(
        emailRegex.test(email) ? email : email + "@recipelib.com",
        password
      )
        .then((user) => {
          console.log("Login result:", user);
          // set user
          setToken(user);
          navigate("/RecipeLibraryWebapp");
        })
        .catch((err) => {
          if (err.message.includes("invalid-credential"))
            seterrMsg("Wrong username or password");
          else
            seterrMsg(err.message);
        });
    }
  }

  return (
    <div className="LoginPage">
      <div className="LoginPageLogo">
        <img src={logoImg} alt="logo" />
        <h1 className="siteTitle">Recipe Library</h1>
      </div>
      <h1 className="RegisterPageTitle">Log into your account</h1>

      <form className="LoginPageForm">
        <div className="InputContainer">
          <label>Username or Email</label>
          <input
            type="text"
            name="name"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="InputContainer">
          <label>Password</label>
          <input
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </form>
      <div className="ActionButtonGroup">
        <Button variant={"filled"} color={"greenspring"} onClick={handleSubmit}>
          {" "}
          Login{" "}
        </Button>
        <span id="betweenActionBtnSpan">or...</span>
        <Button
          variant={"text"}
          color={"black"}
          onClick={() => navigate("/RecipeLibraryWebapp/register")}
        >
          {" "}
          Create new account{" "}
        </Button>
      </div>
      <div className={!errMsg ? "LoginErrMsg.hidden" : "LoginErrMsg"}>
        {errMsg}
      </div>
    </div>
  );
}

export default Login;
