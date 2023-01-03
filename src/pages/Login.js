import './Login.css';
import './global.css'
import React, { useState } from 'react';
// import { authenticate } from "../firebase/database"
import { authenticate } from "../components/firebase/database"
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, seterrMsg] = useState("");

  const fetchUser = async (email, password) => {
    const result = await authenticate(email, password)
    return result;
  }
  function handleSubmit(e) {
    e.preventDefault();
    seterrMsg('');
    if (!email) seterrMsg("Username or Email required !");
    else if (!password) seterrMsg("Password required !");
    else {
      fetchUser(email, password).then(result => {
        if (result[0]) {
          console.log(result[1])        ///////  
          navigate("/")
        } else {
          seterrMsg("Wrong username or password !");
        }
      })
    }
  }

  return (
    <div className='LoginPage'>
      <div className='LoginPageTitle'>
        <img src='/logo.png' alt='logo' />
        <h1>Recipe Library</h1>
      </div>

      <form className='LoginPageForm'>
        <div className='InputContainer'>
          <label>Username or Email</label>
          <input type="text" name="name" onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className='InputContainer'>
          <label>Password</label>
          <input type="password" name="password" onChange={e => setPassword(e.target.value)} />
        </div>
        <input type='submit' value='Login' onClick={handleSubmit} />
      </form>

      <div className={!errMsg ? 'LoginErrMsg.hidden' : 'LoginErrMsg'}>{errMsg}</div>
    </div>
  );
}

export default Login;
