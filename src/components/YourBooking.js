import React, { useState, useEffect } from 'react';
import './Homepage.css';
import './YourBooking.css'
import logo from './image/logo.png';
import { useNavigate } from "react-router-dom";
import axios from '../lib/axios';

function YourBooking() {
    const navigate = useNavigate();
    const [canCancel, setCanCancel] = useState(true);
    const [showCompleted, setShowCompleted] = useState(false);
    const [showIncomplete, setShowIncomplete] = useState(true);

    const [dataIncomplete, setDataIncomplete] = useState([]);
    const [dataCompleted, setDataCompleted] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [dataCleanStatus, setDataCleanStatus] = useState([]);
    
    const handleHomeClick = () => {
        navigate('/homepage');
    };

    const handleAboutClick = () => {
        navigate('/about');
    };

    const handleBookingClick = () => {
        navigate('/booking');
    };

    const handleReviewClick = (bookingID) => {
        navigate('/review');
    };

    const handleProfileClick = () => {
        navigate('/profile');
    };
    const handleLogout = () => {
        navigate('/');
      };

    const handleCancelBookingClick = (bookingID) => {
        navigate('/CancelBooking/'+bookingID);
    };

    const handleReviewBookingClick = (bookingID) => {
        navigate('/ReviewBooking/'+bookingID);
    };

    const handlePayLaterClick = (bookingID) => {
        navigate('/PayLater/'+bookingID);
    };
    
    useEffect(() => {
        const bookingTimes = document.querySelectorAll(".booking-time");
        const currentDate = new Date();
        
        bookingTimes.forEach(time => {
            const bookingTime = new Date(time.innerText);
            const fortyEightHoursAgo = new Date();
            fortyEightHoursAgo.setHours(fortyEightHoursAgo.getHours() - 48);
            
            if (bookingTime < currentDate && currentDate < fortyEightHoursAgo) {
                setCanCancel(false);
            }
        });    
        const url_incomplete = `/yourBooking/incompleted`;
        axios.get(url_incomplete,)
            .then(res => setDataIncomplete(res.data))
            .catch(error => console.error('Error saving data:', error));

        const url_complete = `/yourBooking/completed`;
        axios.get(url_complete,)
                .then(res => setDataCompleted(res.data))
                .catch(error => console.error('Error saving data:', error));
    }, []);
    

    //เรียงลำดับให้ชำระเงินเสร็จแล้วอยู่ก่อนรอชำระเงิน
    const sortedIncompleteData = dataIncomplete.sort((a, b) => {
        // เรียงลำดับแถวที่ต้องชำระเงินอยู่ด้านบนสุด
        if (a.payStatus === "completed" && b.payStatus !== "completed") {
            return -1;
        } else if (a.payStatus !== "completed" && b.payStatus === "completed") {
            return 1;
        } else {
            // เรียงลำดับตาม index ในกรณีที่ payStatus เท่ากันหรือไม่เป็น "completed"
            return a.index - b.index;
        }
    });
    //เรียงลำดับให้รีวิวให้บริการอยู่ก่อนรีวิวเสร็จสิ้น
    const sortedCompleteData = dataCompleted.sort((a, b) => {
        // เรียงลำดับแถวที่มีการรีวิวการบริการอยู่ด้านบนสุด
        if (a.bookReviewID === null && b.bookReviewID !== null) {
            return -1;
        } else if (a.bookReviewID !== null && b.bookReviewID === null) {
            return 1;
        } else {
            // เรียงลำดับตาม index ในกรณีที่ bookReviewID เท่ากันหรือไม่เป็น null
            return a.index - b.index;
        }
    });

    //confirm-button

    const handleOpenModal = (bookID) => {      
      setDataCleanStatus(bookID);
      setShowModal(true);
    };
  
    const handleCloseModal = () => {
      setShowModal(false);
    };
  
    const handleConfirm = () => {
        const url_complete = `/cleaningStatus/confirm`;
        axios.put(url_complete, { bookingID: dataCleanStatus })
        .then(response => {
            console.log('Cleaning status updated successfully');
            window.location.reload();
        })
        .catch(error => {
        console.error('Error updating cleaning status:', error);
        });
    }

    const ConfirmModal = ({ onClose, onConfirm }) => (
        <div className="modal">
          <div className="modal-content">
            <h2>ยืนยันการทำความสะอาด</h2>
            <button id='confirm-cancel' onClick={onClose}>ยกเลิก</button>
            <button id='confirm-confirm' onClick={() => { onConfirm(); onClose(); }}>คอนเฟิร์ม</button>
          </div>
        </div>
      );


//เช็คให้สามารถยกเลิกออเดอร์ภายใน2วันหลังจากชำระเงินเสร็จสิ้น
      const checkDateless2Day = (date) => {
        // สร้างวันปัจจุบัน
        const currentDate = new Date();
        // สร้างวันที่ที่ต้องการเช็ค
        const targetDate = new Date(date);
        // บวก 2 วันกับ targetDate
        targetDate.setDate(targetDate.getDate() + 2);        
        if (targetDate > currentDate) {
            return true; 
        } else {
            return false; 
        }
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

            <div className="bar-menu">YOUR BOOKING</div>
            {/*body*/}
            <div>
                <div>
            </div>
            <div className="completeincompleted">
                <button
                    onClick={() => {
                    setShowIncomplete(true);
                    setShowCompleted(false);
                    }}
                    className={showIncomplete ? 'activeButton' : 'inactiveButton'}
                >
                    Incomplete
                </button>
                <button
                    onClick={() => {
                    setShowCompleted(true);
                    setShowIncomplete(false);
                    }}
                    className={showCompleted ? 'activeButton' : 'inactiveButton'}
                >
                    Completed
                </button>
            </div>

                {showIncomplete && (
                    <div className="bookTable">
                    <table className="table-container">
                            <thead>
                                <tr>
                                    <th>Booking ID</th>
                                    <th>Booking Date</th>
                                    <th>Booking Time</th>
                                    <th>Booking Status</th>
                                    <th>Cleaning Status</th>
                                    <th>เพิ่มเติม</th>
                                </tr>
                            </thead>
                            <tbody>
                                    {sortedIncompleteData.map((booking,index)=>{  
                                        const bookingDate = new Date(booking.serviceDate);
                                        const formattedDate = bookingDate.toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric'})
                                        // หาก booking.cleaningStatus เป็น 0 และ booking.payStatus เป็น "completed" ให้ทำการอัปเดต
                                        if (booking.cleaningStatus === 0 && booking.payStatus === "completed") {
                                            let currentTime = new Date();
                                            const serviceTime = new Date(booking.serviceDate);
                                            let timeDifference = currentTime.getTime() - serviceTime.getTime();
                                            // ถ้า timeDifference > 1 วัน อัปเดต cleaningStatus เป็น 1 และเปลี่ยนคำว่า "รอทำความสะอาด" เป็น "ทำความสะอาดเสร็จสิ้น"
                                            if (timeDifference >= 86400000) {
                                                axios.put(`http://localhost:3000/yourBooking/cleaningStatus/Success`, { bookingID: booking.bookingID })
                                                .then(response => {
                                                    console.log('Cleaning status updated successfully');
                                                    window.location.reload();
                                                })
                                                .catch(error => {
                                                    console.error('Error updating cleaning status:', error);
                                                });
                                        
                                           }
                                        }                                                          
                                        return <tr key={index}>
                                            <td className='idt'>{booking.bookingID}</td>
                                            <td className='idt'>{formattedDate}</td>
                                            <td className='idt'>{booking.bookTime}</td>
                                            <td style={{ background: booking.payStatus === "completed" ? "#68DD82":"#FF7D7D"}}>{booking.payStatus==="completed" ? "ชำระเงินเสร็จสิ้น":"รอชำระเงิน"}</td>
                                            
                                            <td
                                                className="confirm-button"
                                                style={{
                                                background: booking.payStatus === "completed" ? "#f8a86f" : "#C1C1C1"
                                                }}
                                                onClick={()=>handleOpenModal(booking.bookingID)}
                                            >
                                                {booking.payStatus === "completed" && booking.cleaningStatus === 0 ? "รอทำความสะอาด" : booking.payStatus !== "completed" ? "-" : null}

                                            </td>
                                            
                                            <td className="review-button" 
                                                style={{ 
                                                    background: booking.payStatus === "completed" 
                                                        ? (checkDateless2Day(booking.payDate) ? "#FF7D7D" : "#CCCCCC")  
                                                        : "#68DD82"
                                                }}
                                                onClick={() => {
                                                    if (booking.payStatus === "completed") {
                                                        if (checkDateless2Day(booking.payDate)) {
                                                            handleCancelBookingClick(booking.bookingID);
                                                        }
                                                    } else {
                                                        handlePayLaterClick(booking.bookingID);
                                                    }
                                                }}
                                            >
                                                {booking.payStatus === "completed" 
                                                    ? (checkDateless2Day(booking.payDate) ? "ยกเลิก" : "-") 
                                                    : "ชำระเงิน"
                                                }
                                            </td>
                                        </tr>
                                    })}
                             </tbody>       
                            
                            {showModal && (
                                <ConfirmModal
                                onClose={handleCloseModal}
                                onConfirm={handleConfirm}
                                />
                            )}
                        </table>
                    </div>
                )}
                
                {showCompleted && (
                    <div className="bookTable">
                        <table className="table-container">
                            <thead>
                                <tr>
                                    <th>Booking ID</th>
                                    <th>Booking Date</th>
                                    <th>Booking Time</th>
                                    <th>Booking Status</th>
                                    <th>Cleaning Status</th>
                                    <th>เพิ่มเติม</th>
                                </tr>
                            </thead>
                            <tbody>
                                    {sortedCompleteData.map((booking,index)=>{
                                        const bookingDate = new Date(booking.bookDate);
                                        const formattedDate = bookingDate.toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' });
                                        return<tr key={index}>
                                            <td className='idt'>{booking.bookingID}</td>
                                            <td className='idt'>{formattedDate}</td>
                                            <td className='idt'>{booking.bookTime}</td>
                                            <td className='completed'>{booking.payStatus==="completed" ? "ชำระเงินเสร็จสิ้น":""}</td>
                                            <td className='completed'>ทำความสะอาดเสร็จสิ้น</td>
                                            <td ><div>
                                                    {booking.bookReviewID === null && (<div className="review-button pending" onClick={() =>handleReviewBookingClick(booking.bookingID)}>รีวิวการบริการ</div>)}
                                                    {booking.bookReviewID !== null && (<div className="review-button completed">รีวิวเสร็จสิ้น</div>)}
                                            </div></td>

                                        </tr>
                                
                                    })}
                            </tbody>
                        </table>
                    </div>
                )}
            <div className="navi-yourBooking">
                    <button onClick={handleProfileClick}>Back</button>
                </div>
        </div>
        </div>
    );
}

export default YourBooking;