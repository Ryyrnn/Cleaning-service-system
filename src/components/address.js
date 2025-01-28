import './address.css';
import React, { useState } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import logo from './image/logo.png';

function Address() {

  const { selectedSize, price, selectedCategory } = useParams();

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


    const [serviceDate, setserviceDate] = useState('');
    const [serviceTime, setserviceTime] = useState('');
    const [addressInfo, setAddressInfo] = useState('');
    const [street, setStreet] = useState('');
    const [subDistrict, setSubdistrict] = useState('');
    const [district, setDistrict] = useState('');
    const [province, setProvince] = useState('');
    const [postalcode, setPostalCode] = useState('');

    const handleDateChange = (event) => {
      setserviceDate(event.target.value);
    };
  
    const handleTimeChange = (event) => {
      setserviceTime(event.target.value);
    };
  
    const handleaddressInfoChange = (event) => {
      setAddressInfo(event.target.value);
  };
    
    const handlestreetChange = (event) => {
      setStreet(event.target.value);
    };

    const handlesubDistrictChange = (event) => {
      setSubdistrict(event.target.value);
    };
    const handledistrictChange = (event) => {
      setDistrict(event.target.value);
    };
    const handleprovinceChange = (event) => {
      setProvince(event.target.value);
    };
    const handlepostalCodeChange = (event) => {
      setPostalCode(event.target.value);
      
    };
    
    /*back-next*/
  const handleBack = () => {
    navigate('/booking');
  };

  const handleNext = () => {
    const currentDate = new Date();
    const futureDate = new Date(currentDate);
    futureDate.setDate(futureDate.getDate() + 3);

    // Convert serviceDate to Date object for comparison
    const selectedDate = new Date(serviceDate);

    if (!/^\d{5}$/.test(postalcode)) {
      alert('โปรดกรอกรหัสไปรษณีย์ให้เป็นตัวเลข 5 หลัก');
      return;
    }

    // Validate serviceDate
    if (!serviceDate || selectedDate < futureDate) {
      alert('โปรดเลือกวันที่ต้องการทำความสะอาดหลังทำการจองอย่างน้อย 3 วัน');
      return;
    }
    // กรอกให้ครบถ้วน
    if (addressInfo && street && subDistrict && district && province && postalcode && serviceDate && serviceTime) {
      const encodedAddressInfo = encodeURIComponent(addressInfo.replace('/', '-'));
      navigate(`/booking/pay/${selectedSize}/${price}/${selectedCategory}/${serviceDate}/${serviceTime}/${encodedAddressInfo}/${street}/${subDistrict}/${district}/${province}/${postalcode}`);
    } else {
      // ถ้าข้อมูลไม่ครบ
      alert('กรุณากรอกข้อมูลให้ครบถ้วน');
    }
  };
  return (
    //code html
    <div className="app-booking">

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
      <div className="dateTimePickerContainer">
        <div className="dateTimePickerHeader">วันและเวลา
        <br></br>ที่ต้องการทำความสะอาด</div>
        <div className="dateTimePickerContent" style={{marginTop:'10px'}}>
          <input 
            type="date"
            id="serviceDate"
            value={serviceDate}
            onChange={handleDateChange}
            style={{marginLeft : '150px'}} /* ห่างจากหัวข้อ */
            
          />
          <input
            type="time"
            id="serviceTime"
            value={serviceTime}
            onChange={handleTimeChange}
            style={{marginLeft : '50px'}}
            
          />
        </div>
      </div>
      <div className="addressContainer"style={{marginTop:'20px' }}>
        <div className="addressHeader">โปรดระบุที่อยู่</div>
        <div className="addressContent" style={{marginTop : '50px'}}>
          <input
            type="text"
            maxLength= "100"
            id="addressInfo"
            placeholder="AddressInfo"
            value={addressInfo}
            onChange={handleaddressInfoChange}
            style={{marginLeft : '150px'}} /* ห่างจากหัวข้อ */
            className="input-with-padding"
          />
          <input
            type="text"
            maxLength= "100"
            id="street"
            placeholder="Street"
            value={street}
            onChange={handlestreetChange}
            className="input-with-padding"
          />
           <input
            type="text"
            maxLength= "100"
            id="subDistrict"
            placeholder="Sub-district"
            value={subDistrict}
            onChange={handlesubDistrictChange}
            className="input-with-padding"
          />
        </div>
      </div>
      <div className="addressContainer" >
        <div className="addressContent">
          <input
            type="text"
            maxLength= "100"
            id="district"
            placeholder="District"
            value={district}
            onChange={handledistrictChange}
            style={{marginLeft : '408px'}} /* ห่างจากหัวข้อ */
            className="input-with-padding"
          />
          <input
            type="text"
            maxLength= "100"
            id="province"
            placeholder="province"
            value={province}
            onChange={handleprovinceChange}
            className="input-with-padding"
          />
           <input
            type="text"
            maxLength= "5"
            id="postalcode"
            placeholder="Postal code"
            value={postalcode}
            onChange={handlepostalCodeChange}
            className="input-with-padding"
          />
        </div>
        
      </div>
    </div>
    <div className="navigation-buttons">
        <button onClick={handleBack}>Back</button>
        <button onClick={handleNext}>Next</button>
    </div>
    </div>

  );
}

export default Address;