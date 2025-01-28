/* BookingPay.js */
import React, { useState } from 'react';
import './Homepage.css';
import './BookingPay.css';
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import logo from './image/logo.png';
import CreditCard from './image/creditcard.png';
import TrueWallet from './image/truemoneywallet.png';
import PromptPay from './image/promptpay.jpg';

function BookingPay() {

    const { selectedSize, price, selectedCategory,serviceDate,serviceTime,addressInfo,street,subDistrict,district,province,postalcode } = useParams();

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

       /*back-next*/
      const handleBack = () => {
        navigate(`/booking/address/${selectedSize}/${price}/${selectedCategory}`); 
      };

      const handleNext = () => {
        if (!selectedMethod) {
          alert('โปรดเลือกวิธีการชำระเงิน');
          return;
      }
        navigate(`/booking/payment/${selectedSize}/${price}/${selectedCategory}/${serviceDate}/${serviceTime}/${addressInfo}/${street}/${subDistrict}/${district}/${province}/${postalcode}/${selectedMethod}`);
      };

      const [selectedMethod, setSelectedMethod] = useState(null);

        const handleSelect = (method) => {
            setSelectedMethod(method);
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

      <div>
        <p className='title'>รายละเอียดการชำระเงิน</p>
        
        <div className="payment-details">
            <div className="pay-body">ประเภทสถานที่พัก</div>
            <div className="value-body">{selectedCategory}</div>
            </div>
            <div className="payment-details">
                <div className="pay-body">ขนาดสถานที่พัก</div>
                <div className="value-body">{selectedSize}</div>
            </div>
            <div className="payment-details">
                <div className="pay-body">ค่าบริการ</div>
                <div className="value-body">{price}.00 THB</div>
            </div>
            <br></br>
            <div className="payment-details">
                <div className="pay-body">ยอดรวมทั้งสิ้น</div>
                <div className="value-body">{price}.00 THB</div>
            </div>
        </div>
        <p className='title'>โปรดเลือกวิธีการชำระเงิน</p>

        <div id='method'>
            <button className={`buttons ${selectedMethod === 'credit_card' ? 'selected' : ''}`} onClick={() => handleSelect('credit_card')}>
                <img src={CreditCard} alt="Credit Card" className="icon" />
                <span>Credit Card</span>
            </button>
            <button className={`buttons ${selectedMethod === 'promptpay' ? 'selected' : ''}`} onClick={() => handleSelect('promptpay')}>
                <img src={PromptPay} alt="PromptPay" className="icon" />
                <span>Prompt Pay</span>
            </button>
            <button className={`buttons ${selectedMethod === 'true_wallet' ? 'selected' : ''}`} onClick={() => handleSelect('true_wallet')}>
                <img src={TrueWallet} alt="True Wallet" className="icon" />
                <span>True Wallet</span>
            </button>
        </div>
        <br></br>

        <div className='navi-bookingPay'>
          <button onClick={handleBack}>Back</button>
          <button onClick={handleNext}>Next</button>
        </div>

    </div>
  );
}

export default BookingPay;
