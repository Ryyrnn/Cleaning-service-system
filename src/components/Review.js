/* Review.js */
import './Homepage.css';
import './Review.css'
import logo from './image/logo.png';
import star from './image/star.png'
import axios from '../lib/axios';
import React, { useEffect, useState } from 'react';
import {useNavigate} from "react-router-dom";

function Review() {
    const navigate = useNavigate();
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
      fetchReviews();
  }, []);
    

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
      

    const fetchReviews = () => {
      const url_review = `/review`;
      axios.get(url_review,)
          .then(response => {
              const data = response.data; // Extract data from the response
              const sortedReviews = data.sort((a, b) => b.rating - a.rating);
              setReviews(sortedReviews);
          })
          .catch(error => {
              console.error('Error fetching reviews:', error);
          });
  };

    //check Size Category
    const getCategory = (bookingID)=>{
      if (bookingID.startsWith('H')) { return 'House';} 
      else if (bookingID.startsWith('C')) {return 'Condo';} 
      else if (bookingID.startsWith('D')) {return 'Dormitory';}
    };

    const getSize = (bookingID, amount) => {
      if (bookingID.startsWith('H')) {
        
        switch (amount)
         {
          case 3000:return 'Small';
          case 3500:return 'Medium';
          case 4000:return 'Large';
          case 4500:return 'Special';
          default:return '';
        }
      } else if (bookingID.startsWith('C')) {
        switch (amount) {
          case 900:return 'Small';
          case 1200:return 'Medium';
          case 1500:return 'Large';
          case 1800:return 'Special';
          default:return '';
        }
      } else if (bookingID.startsWith('D')) {
        switch (amount) {
          case 600:return 'Small';
          case 900:return 'Medium';
          case 1200:return 'Large';
          case 1500:return 'Special';
          default:return '';
        }
      }
    };

    const renderRatingStars = (rating) => {
        const stars = [];
        for (let i = 0; i < rating; i++) {
            stars.push(<img key={i} src={star} alt="star" className="star-icon" />);
        }
        return stars;
    };


    const rr_date =(d_date) =>{
      const r_date = new Date(d_date);
      const formattedDate = r_date.toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric'})
      return formattedDate;
    }
      
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
      <div className="bar-menu">REVIEW</div> 

      {/*Body*/}
        <div className="reviews-container">
          {reviews.map(review => (
            <div key={review.reviewID} className="review-card"> {/* แก้ key เป็น review.reviewID */}
              <p className='usernameReview'>{review.username}</p><p className='reviewDate'>{rr_date(review.reviewDate)}</p>
              <p className='reviewCate'>{getCategory(review.bookingID)},{getSize(review.bookingID, review.amount)}</p>
              <div className="rating-stars">{renderRatingStars(review.rating)}</div>
              <p>{review.comments}</p> {/* แก้ review.comment เป็น review.comments */}
            </div>
          ))}
        </div>

    </div>
  );
}

export default Review;
