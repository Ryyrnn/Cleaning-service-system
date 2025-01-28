import React, { useState } from 'react';
import './SignUp.css';
import sign_bg from './image/signinup.jpg';
import { useNavigate } from "react-router-dom";
import axios from '../lib/axios';

function SignUp() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
  
    const handleSubmit = (event) => { 
      event.preventDefault();
      // ตรวจสอบว่าทุกฟิลด์ต้องไม่ว่างเปล่าก่อนที่จะอนุญาตให้ผู้ใช้กดปุ่ม "create"
      if (!username || !email || !password || !firstname || !lastname || !phoneNumber) {
        alert('Please fill in all fields.');
        return; // ไม่ทำงานต่อหากข้อมูลไม่ครบ
      }
      
      axios.post('/signup', userList)
      .then(res => {  
        // เมื่อการลงทะเบียนสำเร็จ ให้นำทางไปยังหน้า SignIn
        navigate('/SignIn');
      })
      .catch(error => console.error('Error saving data:', error));
}
    const userList= {
      username: username,
      email: email,
      password: password,
      firstname: firstname,
      lastname: lastname,
      phoneNumber: phoneNumber
    };

  
    return (
      <div className="over_all">
        <div className="sign_up">
          <img src={sign_bg} alt="signinup" className="sign_bg" />
          
          <div className="signup">
              <h1 className='signup_text'>Create an account</h1>
              <form className="signup-form" onSubmit={handleSubmit}>
                <h1 className='user_text'>Username</h1>
                <input type="text" className="username" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                <h1 className='email_text'>E-mail</h1>
                <input type="email" className="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <h1 className='pass_text'>Password</h1>
                <input type="password" className="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <h1 className='fname_text'>First Name</h1>
                <input type="text" className="Fname" placeholder="Firstname" value={firstname} onChange={(e) => setFirstname(e.target.value)} />
                <h1 className='lanme_text'>Last Name</h1>
                <input type="text" className="Lanme" placeholder="Lastname" value={lastname} onChange={(e) => setLastname(e.target.value)} />
                <h1 className='pnumber_text'>Phone Number</h1>
                <input type="text" className="phoneNumber" placeholder="Phone Number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} /> 
                <button type="submit" className="signup-button" onClick={handleSubmit}>create</button>
              </form>
          </div>  
        </div>
      </div>
    );
}

export default SignUp;
