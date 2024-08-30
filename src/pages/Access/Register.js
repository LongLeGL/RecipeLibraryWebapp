import "./Register.css";
import "../global.css";
import logoImg from "../../icons/logo.png";
import React, { useState } from "react";
import { accountRegister } from "../../firebase/database";
import { registerUser } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Buttons/Button";
import { useAuth } from "../../hooks/AuthProvider";

function Register() {
  const navigate = useNavigate();
	const {setToken} = useAuth();

  // const registerUser = async (nemail, npassword) => {
  //     const result = await accountRegister(nemail, npassword)
  //     return result;
  // }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordr, setPasswordr] = useState("");
  const [errMsg, seterrMsg] = useState("");

  async function submitRegister() {
    seterrMsg("");
    if (!email) seterrMsg("Username or Email required !");
    else if (!password) seterrMsg("Password required !");
    else if (password.length < 6)
      seterrMsg("Password needs to be more than 6 characters in length !");
    else if (password !== passwordr) seterrMsg("Passwords don't match !");
    else {
      // All conditions checked
      registerUser(
        emailRegex.test(email) ? email : email + "@recipelib.com",
        password
      )
        .then((res) => {
          console.log("Regis result:", res);
					setToken(res);

					navigate("/RecipeLibraryWebapp");
        })
        .catch((err) => {
          if (err.message.includes("email-already-in-use"))
            seterrMsg("Username/Email is already taken");
          else if (err.message.includes("invalid-email")) 
						seterrMsg("Invalid email");
					else
            seterrMsg(err.message);
        });
    }
  }

  return (
    <div className="RegisterPage">
      <div className="RegisterPageLogo">
        <img src={logoImg} alt="site logo" />
        <h1 className="siteTitle">Recipe Library</h1>
      </div>
      <h1 className="RegisterPageTitle">Register your new account</h1>

      <form className="RegisterPageForm">
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
        <div className="InputContainer">
          <label>Repeat Password</label>
          <input
            type="password"
            name="password"
            onChange={(e) => setPasswordr(e.target.value)}
          />
        </div>
      </form>

      <div className="ActionButtonGroup">
        <Button
          variant={"filled"}
          color={"greenspring"}
          className="RegisterSubmit"
          onClick={submitRegister}
        >
          {" "}
          Create account{" "}
        </Button>
        <Button
          variant={"text"}
          color={"black"}
          onClick={() => navigate("/RecipeLibraryWebapp/login")}
        >
          {" "}
          Have an account ? Log in{" "}
        </Button>
      </div>
      <div className={!errMsg ? "LoginErrMsg.hidden" : "LoginErrMsg"}>
        {errMsg}
      </div>
    </div>
  );
}

export default Register;
