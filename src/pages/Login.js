import './Login.css';
import './global.css'
import React, {useState} from 'react';


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, seterrMsg] = useState("");

  function handleLogin() {
    seterrMsg('');
    console.log(email, password);
    if (!email) seterrMsg("Username or Email required !");
    else if (!password) seterrMsg("Password required !");

    if (!email && !password)  //database validation failed
      seterrMsg("Wrong username or password !");
    
    window.location.href = '/';
  }

  function handleRegister(){
    window.location.href = '/Register';
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
      </form>
      <div className='ActionButtonGroup'>
        <button onClick={handleLogin}>Login</button>
        <button onClick={handleRegister}>Register</button>
      </div>

      <div className= {!errMsg ? 'LoginErrMsg.hidden' : 'LoginErrMsg'}>{errMsg}</div>
    </div>
  );
}

export default Login;
