/* Appp.js */
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './components/Homepage.js';
import About from './components/About.js';
import Booking from './components/Booking.js';
import Review from './components/Review.js';
import Profile from './components/Profile.js';
import YourBooking from './components/YourBooking.js';
import Address from './components/address.js';
import BookingPay from './components/BookingPay.js';
import Payment from './components/Payment.js'
import CompletePayment from './components/Completepayment.js'
import BookingComplete from './components/BookingComplete.js'
import CancelBooking from './components/CancelBooking.js';
import ReviewBooking from './components/ReviewBooking.js';
import SignIn from './components/SignIn.js';
import SignUp from './components/SignUp.js';
import PayLater from './components/PaymentLater.js';
import CompletePaymentLater from './components/CompletePaymentLater.js';
import HomepageBeforeLogin from './components/HomepageBeforeLogin.js'
import AboutBeforeLogin from './components/AboutBeforeLogin.js'
import ReviewBeforeLogin from './components/ReviewBeforeLogin.js'

function App (){

  return (
    <div className="App">
      <Router>
      <Routes>
        <Route path="/" element={<HomepageBeforeLogin />} />
        <Route path="/AboutBeforeLogin" element={<AboutBeforeLogin />} />
        <Route path="/ReviewBeforeLogin" element={<ReviewBeforeLogin />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/about" element={<About />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/review" element={<Review />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/yourbooking" element={<YourBooking />} />
        <Route path="/booking/address/:selectedSize/:price/:selectedCategory" element={<Address />} />
        <Route path="/booking/pay/:selectedSize/:price/:selectedCategory/:serviceDate/:serviceTime/:addressInfo/:street/:subDistrict/:district/:province/:postalcode" element={<BookingPay />} />
        <Route path="/booking/payment/:selectedSize/:price/:selectedCategory/:serviceDate/:serviceTime/:addressInfo/:street/:subDistrict/:district/:province/:postalcode/:selectedMethod" element={<Payment />} />
        <Route path="/booking/payment/completePayment/:selectedSize/:price/:selectedCategory/:serviceDate/:serviceTime/:addressInfo/:street/:subDistrict/:district/:province/:postalcode/:selectedMethod/:payStatus" element={<CompletePayment/>} />
        <Route path="/booking/payment/completePayment/bookingComplete/:selectedSize/:price/:selectedCategory/:serviceDate/:serviceTime/:addressInfo/:street/:subDistrict/:district/:province/:postalcode/:selectedMethod/:payStatus" element={<BookingComplete/>}/>
        <Route path="/booking/payment/completePayment/:bookingID/completed" element={<CompletePaymentLater/>} />
        <Route path="/booking/payment/completePayment/bookingComplete/:bookingID/:payStatus" element={<BookingComplete/>}/>
        <Route path="/CancelBooking/:bookingID" element={<CancelBooking />} />
        <Route path="/ReviewBooking/:bookingID" element={<ReviewBooking />} />
        <Route path="/PayLater/:bookingID" element={<PayLater/>} />

          
      </Routes>
    </Router>
    </div>
  );

}

export default App;
