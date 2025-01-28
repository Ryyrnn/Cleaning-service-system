
import './Homepage.css';
import './Payment.css';
import logo from './image/logo.png';
import QR from './image/QRcode.png';
import { useNavigate,useParams } from "react-router-dom";
import axios from '../lib/axios'

function Payment() {
    const { selectedSize, price, selectedCategory,serviceDate,serviceTime,addressInfo,street,subDistrict,district,province,postalcode,selectedMethod } = useParams();

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

    const handleBack = () => {
        navigate(`/booking/pay/${selectedSize}/${price}/${selectedCategory}/${serviceDate}/${serviceTime}/${addressInfo}/${street}/${subDistrict}/${district}/${province}/${postalcode}`);
    };

    const handlePaid = () => {
        sendData_complete()
        navigate(`/booking/payment/completePayment/${selectedSize}/${price}/${selectedCategory}/${serviceDate}/${serviceTime}/${addressInfo}/${street}/${subDistrict}/${district}/${province}/${postalcode}/${selectedMethod}/completed`);
        
    };
    const handlePaylater = () => {
        sendData_pending()
        navigate(`/booking/payment/completePayment/BookingComplete/${selectedSize}/${price}/${selectedCategory}/${serviceDate ? serviceDate : 'defaultDate'}/${serviceTime ? serviceTime : 'defaultTime'}/${addressInfo}/${street}/${subDistrict}/${district}/${province}/${postalcode}/${selectedMethod}/pending`);
    };

        
    const sendData_complete = () => {
        const url = `/booking/payment/completePayment/${selectedSize}/${price}/${selectedCategory}/${serviceDate}/${serviceTime}/${addressInfo}/${street}/${subDistrict}/${district}/${province}/${postalcode}/${selectedMethod}/completed`;
        axios.get(url, { success: true })
            .then(function (response) {
                console.log(response);
            })
            .catch(error => {
                console.error('Error saving data:', error);
            });
    };

    const sendData_pending = () => {
        const url = `/booking/payment/completePayment/BookingComplete/${selectedSize}/${price}/${selectedCategory}/${serviceDate}/${serviceTime}/${addressInfo}/${street}/${subDistrict}/${district}/${province}/${postalcode}/${selectedMethod}/pending`;
        axios.get(url, { success: true })
            .then(function (response) {
                console.log(response);
            })
            .catch(error => {
                console.error('Error saving data:', error);
            });
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
                <div className='qrcode'>ยอดชำระ {price}.00 บาท</div>
            </div>  

        <div className='navi-payment'>
            <button onClick={handleBack}>Back</button>
            <button onClick={handlePaylater}>ชำระเงินภายหลัง</button>
            <button onClick={handlePaid}>ชำระเงินแล้ว</button>
        </div>

      
    </div>
    );
}

export default Payment;
