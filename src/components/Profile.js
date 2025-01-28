import React, { useState, useEffect } from 'react';
import axios from '../lib/axios';
import './Homepage.css';
import './Profile.css'
import logo from './image/logo.png';
import userIcon from './image/logouser.png';
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState([]);
  const [personalInfoHeader, setPersonalInfoHeader] = useState("PERSONAL INFO");

  useEffect(() => {
    const url_profile = `/profile`;
    axios.get(url_profile)
      .then(res => setUserData(res.data[0]))
      .catch(error => console.error('Error fetching user data:', error));
  }, []);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [id]: value
    }));
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setPersonalInfoHeader("CHANGE PERSONAL INFO");
  };

  const handleSaveClick = (e) => {
    e.preventDefault();
    setIsEditing(false);
    setPersonalInfoHeader("PERSONAL INFO");
    const url_profile_edit = `/profile/edit`;
    axios.put(url_profile_edit, userData)
      .then(res =>{
        console.log(res)
        navigate('/profile');
      } )
      .catch(error => console.error('Error update user data:', error));
    console.log("Saved Data:", userData);
  };

  const handleHomeClick = () => {
    navigate('/homepage');
  };

  const handleAboutClick = () => {
    navigate('/about');
  };

  const handleBookingClick = () => {
    navigate('/booking');
  };

  const handleReviewClick = () => {
    navigate('/review');
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

  const handleYourBookingClick = () => {
    navigate('/yourbooking');
  };
  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="homepage">
      <div className="bar-header">
        <div className="logout">
          <button onClick={handleLogout}>Log out</button>
        </div>
      </div>
      <div className="header-container">
        <img src={logo} alt="logo" className="logo" />
        <h2 className="header-text">C-Leaner : cleansing system service</h2>
        <div className="menu-bar">
          <div className="menu-box">
            <ul>
              <li><button onClick={handleHomeClick} className="custom-button">HOME</button></li>
              <li><button onClick={handleAboutClick} className="custom-button">ABOUT</button></li>
              <li><button onClick={handleBookingClick} className="custom-button">BOOKING</button></li>
              <li><button onClick={handleReviewClick} className="custom-button">REVIEW</button></li>
              <li><button onClick={handleProfileClick} className="custom-button">PROFILE</button></li>
            </ul>  
          </div>
        </div>
      </div>
      <div className="bar-menu">{personalInfoHeader}</div>
      <div>
        <div className="userLogo">
          <img src={userIcon} alt="User" className="user-icon"/>
          <div>
            <div className="userInfo">
              <div>
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" value={userData.username} onChange={handleInputChange} disabled={!isEditing} />
              </div>
              <div>
                <label htmlFor="firstName">First Name:</label>
                <input type="text" id="Fname" value={userData.Fname} onChange={handleInputChange} disabled={!isEditing} />
              </div>
              <div>
                <label htmlFor="lastName">Last Name:</label>
                <input type="text" id="Lname" value={userData.Lname} onChange={handleInputChange} disabled={!isEditing} />
              </div>
              <div>
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" value={userData.email} onChange={handleInputChange} disabled={!isEditing} />
              </div>
              <div>
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" value={userData.password} onChange={handleInputChange} disabled={!isEditing} />
              </div>
              <div>
                <label htmlFor="phoneNumber">Phone Number:</label>
                <input type="text" id="phoneNumber" value={userData.phoneNumber} onChange={handleInputChange} style={{ marginLeft: "10px", padding: "5px", borderRadius: "5px", border: "1px solid #ccc" }} disabled={!isEditing} />
              </div>
              <div className='editSave'>
                {isEditing ? (
                  <button id='save' onClick={handleSaveClick} >Save</button>
                ) : (
                  <button className='edit' onClick={handleEditClick} >Edit</button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='navi-yourBookingProfile'>
        <button onClick={handleYourBookingClick}>Your Booking</button>
      </div>
    </div>
  );
}

export default Profile;
