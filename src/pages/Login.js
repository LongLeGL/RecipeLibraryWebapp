import './Login.css';
import './global.css'
import React, {useState} from 'react';
import {Link} from "react-router-dom";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    console.log(email, password);
    window.location.href = '/';
  }

  return (
    <div className='LoginPage'>
      <div className='LoginPageTitle'>
        <img src='/logo.png' alt='logo' />
        <h1>Recipe Library</h1>
      </div>

      <form>
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
    </div>
  );
}

export default Login;
