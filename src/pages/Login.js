import './Login.css';
import './global.css'
import React, {useState} from 'react';


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, seterrMsg] = useState("");

  function handleSubmit(e) {
    seterrMsg('');
    e.preventDefault();
    console.log(email, password);
    if (!email) seterrMsg("Username or Email required !");
    else if (!password) seterrMsg("Password required !");

    if (!email && !password)  //database validation failed
      seterrMsg("Wrong username or password !");
    
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

      <div className= {!errMsg ? 'LoginErrMsg.hidden' : 'LoginErrMsg'}>{errMsg}</div>
    </div>
  );
}

export default Login;
