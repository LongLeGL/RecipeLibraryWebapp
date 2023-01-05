import './Register.css';
import './global.css'
import React, {useState} from 'react';
import { accountRegister } from '../firebase/database';
import { useNavigate } from 'react-router-dom';

function Register() {
    const navigate = useNavigate()

    const registerUser = async (nemail, npassword) => {
        const result = await accountRegister(nemail, npassword)
        return result;
    }

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordr, setPasswordr] = useState("");
    const [errMsg, seterrMsg] = useState("");

    function submitRegister(){
        seterrMsg('');
        console.log(email, password);
        if (!email) seterrMsg("Username or Email required !");
        else if (!password) seterrMsg("Password required !");
        else if (password !== passwordr) seterrMsg("Passwords don't match !");
        else{
            registerUser(email, password).then(result => {
                if(result[0]) {
                    alert("Registration sucessful !");
                    navigate("/RecipeLibraryWebapp");
                }else{
                  seterrMsg("Username is already taken !");
                }
              })
        }

      }

    return (
        <div className='RegisterPage'>
            <h1 className='RegisterPageTitle'>Registration</h1>
            <form className='RegisterPageForm'>
                <div className='InputContainer'>
                    <label>Username or Email</label>
                    <input type="text" name="name" onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className='InputContainer'>
                    <label>Password</label>
                    <input type="password" name="password" onChange={e => setPassword(e.target.value)} />
                </div>
                <div className='InputContainer'>
                    <label>Repeat Password</label>
                    <input type="password" name="password" onChange={e => setPasswordr(e.target.value)} />
                </div>
            </form>
            <button className='RegisterSubmit' onClick={submitRegister}>Register</button>
            <div className= {!errMsg ? 'LoginErrMsg.hidden' : 'LoginErrMsg'}>{errMsg}</div>
        </div>
    );
}

export default Register;