import './Homepage.css';
import ButtonGroup from './ButtonGroup.js';
import logo from './image/logo.png';
import {useNavigate} from "react-router-dom";
function Booking() {
  const navigate = useNavigate();
    
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
  const handleLogout = () => {
    navigate('/');
  };
    
  return (
    
    //code html
    <div className="app-booking">

        <div className="bar-header">
            <div className="logout">
              <button onClick={handleLogout}>Log out</button>
            </div>
        </div>
          
        {/* โลโก้และหัวข้อ */}
        <div className="header-container">
            <img src={logo} alt="logo" className="logo" />
            <h2 className="header-text">C-Leaner : cleansing system service</h2>
            
        {/* แถบเมนู */}
        <div className="menu-bar">
            <div class="menu-box">
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
      <div className="bar-menu">BOOKING</div> 

        <div class="container-fluid">
             <ButtonGroup navigate={navigate}/>
        </div>
   
    </div>


    
  );
}

export default Booking;
