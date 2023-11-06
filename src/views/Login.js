import './Login.css';
import logoImg from '../icons/logo.png';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, seterrMsg] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    seterrMsg('');
    if (!email) seterrMsg("Username or Email required !");
    else if (!password) seterrMsg("Password required !");
    else {
      // perform authentication
      console.log('authenticating...')
    }
  }

  return (
    <div className='LoginPage'>
      <div className='LoginPageTitle'>
        <h1>2hand Warehouse</h1>
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
      </form>
      <div className='ActionButtonGroup'>
        <button onClick={handleSubmit}> Login </button>
        <button onClick={()=> navigate("/2handWarehouse/Register")}> Register </button>
      </div>
      <div className={!errMsg ? 'LoginErrMsg.hidden' : 'LoginErrMsg'}>{errMsg}</div>
    </div>
  );
}

export default Login;
