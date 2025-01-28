/* CompletepaymentLater.js */
import './Completepayment.css';
import logo from './image/logo.png';
import verification from './image/verification1.png' ;
import {useNavigate} from "react-router-dom";
function CompletePaymentLater() {
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
      const handleNext = () => {
        navigate(`/yourbooking`); 
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
      <div className="container">
        <div className="content">
          <img src={verification} className="image" />
          <p id='completepay'>ชำระเงินเสร็จสิ้น</p>
        </div>
      </div>
      <div className="navigationcompletepay-buttons">
        <button onClick={handleNext}>กลับสู่หน้าหลัก</button>
      </div>
    </div>
  );
}

export default CompletePaymentLater;