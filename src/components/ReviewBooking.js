import React, { useEffect, useState } from 'react';
import './Homepage.css';
import './ReviewBooking.css'
import logo from './image/logo.png';
import { useNavigate, useParams } from "react-router-dom";
import axios from '../lib/axios';

function ReviewBooking() {

    const {bookingID} = useParams();
    const [reviewInfo,setReviewInfo]=useState([]);

    useEffect(() => {
        const url = `/ReviewBooking/`+bookingID;
        axios.get(url,)
            .then(res =>
                {
                    console.log(res.data)
                     setReviewInfo(res.data[0])
                })
            .catch(error => console.error('Error show review data:', error));
    }, [bookingID]);

    const bookingDate = new Date(reviewInfo.bookDate);
    const formattedDate = bookingDate.toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' });


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
    const handleYourBookingClick = () => {
        navigate('/yourbooking');
    };
    const handleLogout = () => {
        navigate('/');
      };

    const submitReview = (e) => {
        e.preventDefault();   
        if (reviewList.rating !== '') { // ตรวจสอบว่า rating ได้ถูกตั้งค่าหรือไม่
            axios.post(`/ReviewBooking/${bookingID}/Submit`, reviewList)
            .then(res => {  
                navigate('/yourbooking');
            })
            .catch(error => console.error('Error saving data:', error));
        } else {
            alert("เลือกดาวดวงนั้น เพื่อฝันที่อยากเป็น");
        }
    }
    
    
    const [reviewList, setReviewList] = useState({
        bookingID: reviewInfo.bookingID,
        rating: '',
        comment: ''
    });



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
                
                {/* Menu bar */}
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
            <div className="bar-menu">REVIEW BOOKING</div> 

            {/* Body */}
            <div>
            <div className='block' >
                    <form>
                        <label>Booking ID</label>
                            <div className='booking' > {reviewInfo.bookingID} </div>

                        <label>Booking Date</label>
                            <div className='booking' > {formattedDate} </div>

                        <label>Booking Time</label>
                            <div className='booking' > {reviewInfo.bookTime} </div>
                        <div className='rating'>
                            <label>ระดับความชื่นชอบ</label>
                            <select onChange={e => setReviewList({...reviewList, rating: e.target.value })} defaultValue="">
                                <option defaultValue>Select Star</option>
                                <option value="5">5 Stars</option>
                                <option value="4">4 Stars</option>
                                <option value="3">3 Stars</option>
                                <option value="2">2 Stars</option>
                                <option value="1">1 Star</option>
                            </select>
                        </div>
                        
                        <br></br>
                        <div className='textComment'>แสดงความคิดเห็น
                            <textarea onChange={e => setReviewList({...reviewList, comments: e.target.value})}></textarea>
                        </div>
                        

                        <div className="navi-bookreview navi-send">
                            <button type="submit" onClick={submitReview}>Send</button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="navi-bookreview navi-back">
                    <button onClick={handleYourBookingClick}>Back</button>
                </div>
        </div>
    );
}

export default ReviewBooking;
