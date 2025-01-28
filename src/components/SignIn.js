import React, { useState } from 'react';
import './SignIn.css';
import logo from './image/logo.png';
import sign_bg from './image/signinup.jpg';
import { useNavigate } from "react-router-dom";
import axios from '../lib/axios';

function SignIn() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  

  const handleSubmit = (event) => {
    event.preventDefault();

    axios.post('/signIn',{
      username,
      password
    })
    .then(response => {
      console.log(response)
      localStorage.setItem('token',JSON.stringify(response.data))//ใช้token เพื่อเก็ยlocal storage-->axiosInstance
      navigate('/homepage')

    })
    .catch(err => {
      console.log(err)
      alert(err.response.data)
    })

   
  };

  const handleCreateAccount = () => {
    navigate('/signup');
  };

  return (
    <div className="over_all">
      <div className="sign_in">
        <img src={sign_bg} alt="signinup" className="sign_bg" />
        <img src={logo} alt="logo" className="logo_signin" />
        <div className="login">
          <h1 className='signin_text'>Sign In</h1>
          <h1 className='new_text'>new user? <button className="create_ac" onClick={handleCreateAccount}>Create an account</button></h1>
          <form className="login-form" onSubmit={handleSubmit}>
            <input type="text" className="login-input" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <input type="password" className="login-input" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit" className="login-button">Sign In</button>
          </form>
        </div>  
      </div>
    </div>
  );
}

export default SignIn;
