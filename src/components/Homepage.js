/* Homepage.js */
import './Homepage.css';
import logo from './image/logo.png';
import bg1 from './image/bg1.jpeg';
import bg2 from './image/bg2.jpg';
import bg3 from './image/bg3.jpeg';
import bg4 from './image/bg4.jpg';
import bg5 from './image/bg5.jpeg';
import home2 from './image/home2.jpg';
import home1 from './image/home1.jpg';
import {useNavigate} from "react-router-dom";
function Homepage() {
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
      <div className="bg_pic">
        <figure>
          <img src={bg5} alt="bg5" className="bg5" />
          <img src={bg1} alt="bg1" className="bg1" />
          <img src={bg2} alt="bg2" className="bg2" />
          <img src={bg3} alt="bg3" className="bg3" />
          <img src={bg4} alt="bg4" className="bg4" />
          
        </figure>
      </div>
      <div className="bg_company">
        <h2 className="bg_about_head">Welcome to C-Leaner</h2>
        <h3 className="bg_about_detail">C-Leaner ก่อตั้งขึ้นในปี 2023 ด้วยความมุ่งมั่นที่จะมอบบริการทำความสะอาดแบบครบวงจรที่เหนือกว่าแก่ลูกค้าของเรา 
        ด้วยทีมงานมืออาชีพที่ผ่านการฝึกอบรมมาอย่างดีและน้ำยาทำความสะอาดที่ปลอดภัยต่อเด็กและสัตว์เลี้ยง C-Leaner 
        มุ่งมั่นที่จะทำให้บ้านของคุณสะอาด ปลอดภัย และน่าอยู่</h3>
        <div class="container1">
        <img src={home1} alt="home1" className="home1" />
        <div class="content1">
          <h2 className="bg_service_head1">Our Service</h2>
          <h3 className="bg_about_detail1_1">C-Leaner นำเสนอบริการทำความสะอาดที่หลากหลายเพื่อตอบสนองความต้องการของลูกค้าทุกท่าน</h3>
          <h3 className="bg_about_detail1"><strong>ทำความสะอาดบ้านทั่วไป:</strong> เน้นพื้น ผนัง เฟอร์นิเจอร์ และห้องน้ำ</h3>
          <h3 className="bg_about_detail1"><strong>ทำความสะอาดหลังการก่อสร้าง:</strong> กำจัดฝุ่น เศษวัสดุ และคราบสกปรกจากการก่อสร้าง</h3>
          <h3 className="bg_about_detail1"><strong>ทำความสะอาดออฟฟิศ:</strong> ทำความสะอาดพื้นที่ทำงาน เฟอร์นิเจอร์ อุปกรณ์อิเล็กทรอนิกส์ และห้องน้ำ</h3>
          <h3 className="bg_about_detail1"><strong>ทำความสะอาดคอนโดมิเนียม:</strong> บริการทำความสะอาดแบบครบวงจรสำหรับคอนโดมิเนียม</h3>
          <h3 className="bg_about_detail1"><strong>บริการอื่นๆ:</strong> บริการขัดพื้น เคลือบเงา เฟอร์นิเจอร์ บริการทำความสะอาดถังน้ำ บริการซักผ้าห่ม ผ้าปูที่นอน</h3>
        </div>
      </div>
      <div class="container2">
        <img src={home2} alt="home2" className="home2" />
        <div class="content2">
        <h2 className="bg_service_head2">Our strengths</h2>
        <h3 className="bg_about_detail2"><strong>ทีมงานมืออาชีพ:</strong> พนักงานของเราผ่านการฝึกอบรมมาอย่างดี มีประสบการณ์ และทุ่มเทให้กับงาน</h3>
        <h3 className="bg_about_detail2"><strong>น้ำยาทำความสะอาดที่ปลอดภัย:</strong> เราใช้น้ำยาทำความสะอาดที่ปลอดภัยต่อเด็ก สัตว์เลี้ยง และสิ่งแวดล้อม</h3>
        <h3 className="bg_about_detail2"><strong>บริการที่เชื่อถือได้:</strong> เรามุ่งมั่นที่จะให้บริการที่มีคุณภาพสูงและตรงต่อเวลาแก่ลูกค้าทุกท่าน</h3>
        <h3 className="bg_about_detail2"><strong>ราคาที่เหมาะสม:</strong> เราเสนอบริการทำความสะอาดในราคาที่แข่งขันได้</h3>
      </div> 
      </div>
    </div>
    </div>
  );
}


export default Homepage;
