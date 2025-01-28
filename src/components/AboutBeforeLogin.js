import './Homepage.css';
import './About.css';
import logo from './image/logo.png';
import phone from './image/Phone.png' ;
import aboutus1 from './image/aboutus1.jpg' ;
import aboutus2 from './image/aboutus2.jpg' ;
import aboutus3 from './image/aboutus3.jpg' ;
import location from './image/location.png' ;
import {useNavigate} from "react-router-dom";

function About() {
    const navigate = useNavigate();
    
    const handleHomeClick = () => {
        navigate('/');
      };
      const handleAboutClick = () => {
        navigate('/AboutBeforeLogin');
      };
      const handleBookingClick = () => {
        navigate('/SignIn');
      };
      const handleReviewClick = () => {
        navigate('/ReviewBeforeLogin');
      };
      const handleProfileClick = () => {
        navigate('/SignIn');
      };
      const handleSignIn = () => {
        navigate('/SignIn');
      };
  return (
    <div className="homepage">
      <div className="bar-header">

      <div className="logout">
          <button onClick={handleSignIn}>Sign in/Sign up</button>
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
      <div className="bar-menu">ABOUT</div> 

      {/*Body*/}
      <div className = "address" >
        <img src={location} alt="location" className="location"/>
        <div><p className='title-about'>ที่อยู่</p> </div>
        <div><p className='detail'>99 หมู่18 ตำบลคลองหนึ่ง อำเภอคลองหลวง จังหวัดปทุมธานี 12120</p></div>
      </div>   
      <div className='connection'>
        <img src={phone} alt="phone" className="phone" />   
        <div><p className='connec'>ช่องทางการติดต่อ</p></div>
        <div><p className='tel-num'>Tel.020-4886236</p></div> 
      </div>
      <div class="image-container">
        <div class="image-wrapper">
          <img src={aboutus1} alt="aboutus1" className="aboutus1" style={{marginLeft: '150px'}}/>
        </div>
        <div class="image-wrapper">
          <img src={aboutus2} alt="aboutus2" className="aboutus2" />
        </div>
        <div class="image-wrapper">
          <img src={aboutus3} alt="aboutus3" className="aboutus3" style={{marginRight: '150px'}}/>
        </div>
      </div>
    </div>
  );
}

export default About;
