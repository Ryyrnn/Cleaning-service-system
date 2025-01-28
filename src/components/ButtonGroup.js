import React, { useState} from 'react';
import './ButtonGroup.css'; // Import your CSS file for button styles
import ImgHome from './image/home.jpg'; // Adjust paths accordingly
import ImgCondo from './image/condo.jpg';
import ImgDormitory from './image/dormitory.jpg';
import { useNavigate } from 'react-router-dom';

const ButtonGroup = () => {
  const [selectedCategory, setSelectedCategory] = useState('Home');
  const [selectedButton, setSelectedButton] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [price, setPrice] = useState(null);
  const navigate = useNavigate();

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSelectedButton(null); // Reset selected button when category changes
    setPrice(null); // Reset price when category changes
  };

  const handleButtonClick = (buttonNumber) => {
    setSelectedButton(buttonNumber);
    
    // Example: Store price information based on selected button
    if (selectedCategory === 'Home') {
      handleHomeButtonClick(buttonNumber);
    } else if (selectedCategory === 'Condo') {
      handleCondoButtonClick(buttonNumber);
    } else if (selectedCategory === 'Dormitory') {
      handleDormitoryButtonClick(buttonNumber);
    }
  };

  const handleHomeButtonClick = (buttonNumber) => {
    if (buttonNumber === 1) {
      setPrice(3000);
      setSelectedSize('Small');
    } else if (buttonNumber === 2) {
      setPrice(3500);
      setSelectedSize('Medium');
    } else if (buttonNumber === 3) {
      setPrice(4000);
      setSelectedSize('Large');
    } else if (buttonNumber === 4) {
      setPrice(4500);
      setSelectedSize('Special');
    }
  };

  const handleCondoButtonClick = (buttonNumber) => {
    if (buttonNumber === 1) {
      setPrice(900);
      setSelectedSize('Small');
    } else if (buttonNumber === 2) {
      setPrice(1200);
      setSelectedSize('Medium');
    } else if (buttonNumber === 3) {
      setPrice(1500);
      setSelectedSize('Large');
    } else if (buttonNumber === 4) {
      setPrice(1800);
      setSelectedSize('Special');
    }
  };

  const handleDormitoryButtonClick = (buttonNumber) => {
    if (buttonNumber === 1) {
      setPrice(600);
      setSelectedSize('Small');
    } else if (buttonNumber === 2) {
      setPrice(900);
      setSelectedSize('Medium');
    } else if (buttonNumber === 3) {
      setPrice(1200);
      setSelectedSize('Large');
    } else if (buttonNumber === 4) {
      setPrice(1500);
      setSelectedSize('Special');
    }
  };
  /*back-next*/
  const handleBack = () => {
    navigate('/homepage');
  };

  const handleNext = () => {
    if (!selectedCategory || !selectedSize) {
      alert('โปรดเลือกประเภทและขนาดของที่พัก');
      return;
    }
    navigate(`/booking/address/${selectedSize}/${price}/${selectedCategory}`); 
  };

  const renderButtons = () => {
    let buttons = [];
    if (selectedCategory === 'Home') {
      buttons = [
        { number: 1, label: 'Small', text: 'น้อยกว่าหรือเท่ากับ 60 ตร.วา' },
        { number: 2, label: 'Medium', text: 'น้อยกว่าหรือเท่ากับ 80 ตร.วา' },
        { number: 3, label: 'Large', text: 'น้อยกว่าหรือเท่ากับ 100 ตร.วา' },
        { number: 4, label: 'Special', text: 'น้อยกว่าหรือเท่ากับ 120 ตร.วา' },
      ];
    } else if (selectedCategory === 'Condo') {
      buttons = [
        { number: 1, label: 'Small', text: 'น้อยกว่าหรือเท่ากับ 32 ตร.ม' },
        { number: 2, label: 'Medium', text: 'น้อยกว่าหรือเท่ากับ 36 ตร.ม' },
        { number: 3, label: 'Large', text: 'น้อยกว่าหรือเท่ากับ 40 ตร.ม' },
        { number: 4, label: 'Special', text: 'มากกว่า 40 ตร.ม' },
      ];
    } else if (selectedCategory === 'Dormitory') {
      buttons = [
        { number: 1, label: 'Small', text: 'น้อยกว่าหรือเท่ากับ 32 ตร.ม' },
        { number: 2, label: 'Medium', text: 'น้อยกว่าหรือเท่ากับ 36 ตร.ม' },
        { number: 3, label: 'Large', text: 'น้อยกว่าหรือเท่ากับ 40 ตร.ม' },
        { number: 4, label: 'Special', text: 'มากกว่า 40 ตร.ม' },
      ];
    }

    return buttons.map(button => (
      <button
        key={button.number}
        className={`button ${selectedButton === button.number ? 'selected' : ''}`}
        onClick={() => handleButtonClick(button.number, button.label)}
      >
        <div className="button-container">
          <label className="left-text">{button.label}</label>
          <span className="right-text">{button.text}</span>
        </div>
      </button>
    ));
  };

  return (
    <div className="App">
      <div className="image-container">
        <img src={ImgHome} alt="Image 1" className="image1" />
        <img src={ImgCondo} alt="Image 2" className="image2" />
        <img src={ImgDormitory} alt="Image 3" className="image3" />
      </div>
      <div className="category-buttons">
        <button className={selectedCategory === 'Home' ? 'selected' : ''} onClick={() => handleCategoryChange('Home')}>Home</button>
        <button className={selectedCategory === 'Condo' ? 'selected' : ''} onClick={() => handleCategoryChange('Condo')}>Condo</button>
        <button className={selectedCategory === 'Dormitory' ? 'selected' : ''} onClick={() => handleCategoryChange('Dormitory')}>Dormitory</button>
      </div>

      <section className='booking-title'>
        โปรดเลือกขนาดพื้นที่
      </section>

      <div className="button-group">
        {renderButtons()}
        
      </div>
      
      <div className="navi-buttonGroup">
        <button onClick={handleBack}>Back</button>
        <button onClick={handleNext}>Next</button>
      </div>
        
    </div>
  );
};

export default ButtonGroup;
