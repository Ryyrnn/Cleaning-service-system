import React, { useState } from 'react';
import './Homepage.css';
import './Payment.css';
import logo from './image/logo.png';
import QR from './image/QRcode.png';
import { useNavigate,useParams } from "react-router-dom";
import axios from '../lib/axios'
import { useEffect } from 'react';

function PaymentLater() {
    const {bookingID} = useParams();
    const [paylater, setPayLater] = useState([]);
    


    useEffect(() => {
        const url = `/PayLater/`+bookingID;
        axios.get(url,)
            .then(res =>
                {
                    console.log(res.data)
                    setPayLater(res.data[0])
                })
            .catch(error => console.error('Error show pay data:', error));
    }, [bookingID]);



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
    
    const handlePaid = () => {
        const url = `/paymentLater/success`;
        axios.put(url, { bookPayID: paylater.bookPayID ,payStatus: 'completed' })
            .then(function (response) {
                console.log(response);
                navigate(`/booking/payment/completePayment/${bookingID}/completed`);
            })
            .catch(error => {
                console.error('Error saving data:', error);
            });        
    };

    const handlePaylater = () => {
        navigate(`/yourbooking`);
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

            <div className="bar-menu">BOOKING</div>
                <p className='title'>การชำระเงิน</p>
            <div className='qrcode'>
                <img src={QR} alt="QR"/>
            </div>
            <div>
                <div className='qrcode'>ยอดชำระ {paylater.amount}.00 บาท</div>
            </div>  

        <div className='navi-payment'>
             <button onClick={handlePaylater}>ชำระเงินภายหลัง</button> 
            <button onClick={handlePaid}>ชำระเงินแล้ว</button>
        </div>

      
    </div>
    );
}

export default PaymentLater;
