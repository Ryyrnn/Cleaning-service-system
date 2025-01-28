/* CancelBooking.js */
import React, { useState, useEffect } from 'react';
import './Homepage.css';
import './CancelBooking.css'
import logo from './image/logo.png';
import { useNavigate, useParams } from "react-router-dom";
import axios from '../lib/axios';

function CancelBooking() {
  const {bookingID} = useParams();
  const navigate = useNavigate();
  const [showBookingDetails, setShowBookingDetails] = useState(true);
  const [dataCancle,setDataCancle]=useState([]);

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

  const handleCancelBookingClick = (e) =>{
    e.preventDefault();
    const url_complete = `/booking/cancel/`+bookingID;
    axios.delete(url_complete)
    .then(response => {
        console.log('Cleaning status cancle booking successfully');
        navigate('/yourbooking');
    })
    .catch(error => {
    console.error('Error cancel booking:', error);
    });
  };
  

  useEffect(() => { 
    const url = `/CancelBooking/`+bookingID;
    axios.get(url,)
        .then(res => setDataCancle(res.data[0]))
        .catch(error => console.error('Error show data for cancle:', error));
}, [bookingID]);

const bookingDate = new Date(dataCancle.bookDate);
const formattedDate = bookingDate.toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' });


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

      <div className="bar-menu">CANCEL BOOKING</div>

      {/* Body */}
      <div>
        <div style={{ width: "700px", margin: "auto", marginTop: "20px", borderRadius: "20px", textAlign: "left", padding: "20px", position: "relative" }}>
          {showBookingDetails &&  (
            <>  
                <div className="">
                  <div className='cancel-data'><p>Booking ID :</p>{<p className='cancel-data-p'>{dataCancle.bookingID}</p>}</div>
                  <div className='cancel-data'><p>Booking Date :</p>{<p className='cancel-data-p'>{formattedDate}</p>}</div>
                  <div className='cancel-data'><p>Booking Time :</p>{<p className='cancel-data-p'>{dataCancle.bookTime}</p>}</div>
                  <div className='cancel-data'><p>ท่านจะได้รับเงินคืน :</p>{<p className='cancel-data-p'>{dataCancle.amount}</p>}</div>
                  <div className='cancel-data'><p>ช่องทางการคืนเงิน :</p><p className='cancel-data-p'>Prompt-Pay</p>{<p className='cancel-data-p'>{dataCancle.phoneNumber}</p>}</div>
                </div>
              <div>
                
              </div>
            </>
          )}
          <div className="refund">
            <p className='refund-title'>ข้อตกลงของการยกเลิกการบริการ</p>
            <p className='refund-text'>หากท่านต้องการยกเลิกการบริการ สามารถขอรับเงินคืนได้ภายหลังจากเวลาการชำระเงิน 48 ชั่วโมง ซึ่งทางบริษัทจะคืนเงินให้เป็นจำนวนร้อยละ 75 ของค่าบริการ</p>
            <p className='refund-text'>หากเกินกว่า 48 ชั่วโมง ท่านจะไม่สามารถขอรับเงินคืนได้</p>
          </div>
          <div className='navi-cancel'>
            <button type="submit" onClick={handleCancelBookingClick}>ยกเลิกการจอง</button>
          </div>
          
        </div>
      </div>

      <div className="navi-cancelBack">
        <button onClick={handleYourBookingClick} >
          Back
        </button>
      </div>
    </div>
  );
}

export default CancelBooking;


