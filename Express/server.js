const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require('./database')
const cors = require('cors');
const bcrypt = require('bcryptjs');
const authRoute = require('./routes/auth')
const generateNextID = require('./utils/generateNextId')
const jwt = require('jsonwebtoken')


app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Origin', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
})

app.use(cors());
app.use(bodyParser.json())
const port = 3001;


// Define a route to retrieve user information by user ID
app.get('/profile', (req, res, next) => {

  jwt.verify(req.headers.authorization, 'secret_key', (err, userID) => {//verify เพื่อ'ถอด'รหัส โดยใช้secret key เพื่อเข้า-ถอดรหัส 
    if (err) {
      console.error(err)
      res.status(500).send('Internal errorsss')
    }//

    const sql = 'SELECT * FROM users WHERE userID = ?';

    // Query the user database using the provided user ID
    connection.query(sql, [userID], (error, results) => {
      if (error) {
        console.error('Error retrieving user data:', error);
        res.status(500).send('Error retrieving user data');
        return;
      }

      // Check if any results were returned
      if (results.length === 0) {
        // If no user found with the provided ID, return appropriate response
        res.status(404).send('User not found');
      }
      return res.send(results); // Return the first result
    }
    );
  })

});

//edit profile
app.put('/profile/edit', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  const Fname = req.body.Fname;
  const Lname = req.body.Lname;
  const phoneNumber = req.body.phoneNumber;

  jwt.verify(req.headers.authorization, 'secret_key', async(err, userID) => {
    if (err) {
      console.error(err)
      res.status(500).send('Internal errorsss')
    }

    const hashPass =await bcrypt.hash(password,10)//hash is async ต้องใส่นะ!!
    connection.query(
      'UPDATE users SET username = ?, password = ?, email = ?, Fname = ?, Lname = ?, phoneNumber = ? WHERE userID = ?',
      [username, hashPass, email, Fname, Lname, phoneNumber, userID],
      function (err, results) {
        if (err) {
          console.error('Error updating user data:', err);
          res.status(500).send('Error updating user data');
          return;
        }
        res.status(201).send('Data updated successfully');
      }
    );
  })
})



//booking but dont pay first
app.get('/booking/payment/completePayment/BookingComplete/:selectedSize/:price/:selectedCategory/:serviceDate/:serviceTime/:addressInfo/:street/:subDistrict/:district/:province/:postalcode/:selectedMethod/pending', (req, res, next) => {
  //const userID = 'U6011734';
  const amount = parseInt(req.params.price);
  const serviceDate = req.params.serviceDate;
  const serviceTime = req.params.serviceTime;
  const addressInfo = req.params.addressInfo;
  const Address = addressInfo.replace('-', '/');
  const street = req.params.street;
  const subDistrict = req.params.subDistrict;
  const district = req.params.district;
  const province = req.params.province;
  const postalcode = req.params.postalcode;
  const payMethod = req.params.selectedMethod;
  const payStatus = 'pending';
  const cleaningStatus = 'F';
  const selectedCategory = req.params.selectedCategory;
  let payID;
  const cID = 'CL56667778'
  let bookingID

  jwt.verify(req.headers.authorization, 'secret_key', (err, userID) => {//verify เพื่อ'ถอด'รหัส โดยใช้secret key เพื่อเข้า-ถอดรหัส 
    if (err) {
      console.error(err)
      res.status(500).send('Internal errorsss')
    }//เผื่อtoken ที่ถอดมั่วๆ

        // กำหนดค่า bookingID โดยเรียงลำดับ
        connection.query("SELECT MAX(bookingID) AS maxBookingID FROM booking WHERE bookingID LIKE ?", [selectedCategory[0] + '%'], (error, results, fields) => {
          if (error) throw error;
          let maxBookingID = results[0].maxBookingID;
          // หากไม่มีข้อมูลในตารางหรือไม่มีตัวอักษร "C" นำหน้า
          if (!maxBookingID) {
            maxBookingID = selectedCategory[0] + "000000000000"; // เริ่มต้นที่ C00000
          }
          bookingID = generateNextID(maxBookingID);
          // กำหนดค่า payID โดยเรียงลำดับ
          connection.query("SELECT MAX(payID) AS maxPayID FROM payment WHERE payID LIKE 'P%'", (error, results, fields) => {
            if (error) throw error;
            let maxPayID = results[0].maxPayID;
            if (!maxPayID) {
              maxPayID = "P" + "000000000000";
            }
            // ดำเนินการสร้าง userID ถัดไป
            payID = generateNextID(maxPayID);

            // bookdate bookTime 
            const currentDate_Time = new Date();
            const bookDate = currentDate_Time.toISOString().split('T')[0];
            const bookTime = `${currentDate_Time.getHours()}:${currentDate_Time.getMinutes()}:${currentDate_Time.getSeconds()}`;

            // pending unsuccess
            connection.query(
              'INSERT INTO `payment` (`payID`, `amount`, `payStatus`, `payMethod`, `payDate`, `payTime`) VALUES (?,?,?,?,?,?)',
              [payID, amount, payStatus, payMethod, "", ""],
              function (err, results) {
                if (err) {
                  console.error('Error saving data:', err);
                  res.status(500).send('Error saving data');
                  return;
                }
                // booking and payment success
                connection.query(
                  'INSERT INTO `booking` (`bookingID`, `userID`, `cID`, `payID`, `addressInfo`, `street`, `province`, `subDistrict`, `district`, `postalcode`, `bookDate`, `bookTime`, `serviceDate`, `serviceTime`, `cleaningStatus`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
                  [bookingID, userID, cID, payID, Address, street, province, subDistrict, district, postalcode, bookDate, bookTime, serviceDate, serviceTime, cleaningStatus],
                  function (err, results) {
                    if (err) {
                      console.error('Error saving data:', err);
                      res.status(500).send('Error saving data');
                      return;
                    }
                    res.send('Data saved successfully');
                  });
              });
          });
        });
    })
});
// booking and pay first
app.get('/booking/payment/completePayment/:selectedSize/:price/:selectedCategory/:serviceDate/:serviceTime/:addressInfo/:street/:subDistrict/:district/:province/:postalcode/:selectedMethod/completed', (req, res, next) => {
  //const userID = 'U6011734';
  const amount = parseInt(req.params.price);
  const serviceDate = req.params.serviceDate;
  const serviceTime = req.params.serviceTime;
  const addressInfo = req.params.addressInfo;
  const Address = addressInfo.replace('-', '/');
  const street = req.params.street;
  const subDistrict = req.params.subDistrict;
  const district = req.params.district;
  const province = req.params.province;
  const postalcode = req.params.postalcode;
  const payMethod = req.params.selectedMethod;
  const payStatus = 'completed';
  const cleaningStatus = 'F';
  const selectedCategory = req.params.selectedCategory;
  let payID;
  const cID = 'CL56667778'
  let bookingID

  jwt.verify(req.headers.authorization, 'secret_key', (err, userID) => {//verify เพื่อ'ถอด'รหัส โดยใช้secret key เพื่อเข้า-ถอดรหัส 
    if (err) {
      console.error(err)
      res.status(500).send('Internal errorsss')
    }//เผื่อtoken ที่ถอดมั่วๆ

        // กำหนดค่า bookingID โดยเรียงลำดับ
        connection.query("SELECT MAX(bookingID) AS maxBookingID FROM booking WHERE bookingID LIKE ?", [selectedCategory[0] + '%'], (error, results, fields) => {
          if (error) throw error;
          let maxBookingID = results[0].maxBookingID;
          // หากไม่มีข้อมูลในตารางหรือไม่มีตัวอักษร "C" นำหน้า
          if (!maxBookingID) {
            maxBookingID = selectedCategory[0] + "000000000000"; // เริ่มต้นที่ C00000
          }
          bookingID = generateNextID(maxBookingID);
          // กำหนดค่า payID โดยเรียงลำดับ
          connection.query("SELECT MAX(payID) AS maxPayID FROM payment WHERE payID LIKE 'P%'", (error, results, fields) => {
            if (error) throw error;
            let maxPayID = results[0].maxPayID;
            if (!maxPayID) {
              maxPayID = "P" + "000000000000";
            }
            // ดำเนินการสร้าง userID ถัดไป
            payID = generateNextID(maxPayID);

            // Paydate PayTime 
            const currentDate_Time_Payment = new Date();
            const payDate = currentDate_Time_Payment.toISOString().split('T')[0];
            const payTime = `${currentDate_Time_Payment.getHours()}:${currentDate_Time_Payment.getMinutes()}:${currentDate_Time_Payment.getSeconds()}`;

            //  bookdate bookTime 
            const currentDate_Time = new Date();
            const bookDate = currentDate_Time.toISOString().split('T')[0];
            const bookTime = `${currentDate_Time.getHours()}:${currentDate_Time.getMinutes()}:${currentDate_Time.getSeconds()}`;

            // pending success
            connection.query(
              'INSERT INTO `payment` (`payID`, `amount`, `payStatus`, `payMethod`, `payDate`, `payTime`) VALUES (?,?,?,?,?,?)',
              [payID, amount, payStatus, payMethod, payDate, payTime],
              function (err, results) {
                if (err) {
                  console.error('Error saving data:', err);
                  res.status(500).send('Error saving data');
                  return;
                }
                // booking and payment success
                connection.query(
                  'INSERT INTO `booking` (`bookingID`, `userID`, `cID`, `payID`, `addressInfo`, `street`, `province`, `subDistrict`, `district`, `postalcode`, `bookDate`, `bookTime`, `serviceDate`, `serviceTime`, `cleaningStatus`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
                  [bookingID, userID, cID, payID, Address, street, province, subDistrict, district, postalcode, bookDate, bookTime, serviceDate, serviceTime, cleaningStatus],
                  function (err, results) {
                    if (err) {
                      console.error('Error saving data:', err);
                      res.status(500).send('Error saving data');
                      return;
                    }
                    res.send('Data saved successfully');
                  });
              });
          });
        });
      }) 
});


//show work incompleted
app.get('/yourBooking/incompleted', (req, res, next) => {

  jwt.verify(req.headers.authorization, 'secret_key', (err, userID) => {//verify เพื่อ'ถอด'รหัส โดยใช้secret key เพื่อเข้า-ถอดรหัส 
    if (err) {
      console.error(err)
      res.status(500).send('Internal errorsss')
    }//เผื่อtoken ที่ถอดมั่วๆ

    const sql = `
    SELECT 
        booking.*, 
        payment.payStatus,
        payment.payDate
    FROM 
        booking 
        INNER JOIN payment ON booking.payID = payment.payID 
    WHERE 
        booking.cleaningStatus = 0 
        AND booking.userID = ?`;

connection.query(sql, [userID], function (err, results) {
    if (err) {
        console.error('Error fetching data:', err);
        res.status(500).send('Error fetching data');
        return;
    }
    
    // Handle results here
    res.send(results);
});

  })
});

//sign in
app.use(authRoute)

// sign up
app.post('/signup', async (req, res, next) => {
  let userID;
  const { username, email, password, firstname, lastname, phoneNumber } = req.body;

  //chech Username already used?
  const sql = 'SELECT * FROM users WHERE username=?'
  connection.query(sql, [username], async (err, result) => {

    if (err) {
      console.error(err)
      return res.status(500).send('Internal errors')
    }

    if (result.length > 0/*แปลว่าซ้ำ*/) return res.status(409).send('Username already in used.')

    const hashPass = await bcrypt.hash(password, saltRounds)


    // กำหนดค่า userID โดยเรียงลำดับ
    connection.query("SELECT MAX(userID) AS maxUserID FROM users WHERE userID LIKE 'U%'", (error, results, fields) => {
      if (error) throw error;
      let maxUserID = results[0].maxUserID;
      if (!maxUserID) {
        maxUserID = "U" + "0000000";
      }
      // ดำเนินการสร้าง userID ถัดไป
      userID = generateNextID(maxUserID);
      connection.query(
        'INSERT INTO `users` (`userID`, `username`, `password`, `email`, `Fname`, `Lname`, `phoneNumber`) VALUES (?,?,?,?,?,?,?)',
        [userID, username, hashPass, email, firstname, lastname, phoneNumber],
        function (err, results) {
          if (err) {
            console.error('Error saving data:', err);
            res.status(500).send('Error saving data');
            return;
          }
          res.status(201).send('Data saved successfully');
        });
    });

  })



});



//show work completed
app.get('/yourBooking/completed', (req, res, next) => {

  jwt.verify(req.headers.authorization, 'secret_key', (err, userID) => {//verify เพื่อ'ถอด'รหัส โดยใช้secret key เพื่อเข้า-ถอดรหัส 
    if (err) {
      console.error(err)
      res.status(500).send('Internal errors')
    }//เผื่อtoken ที่ถอดมั่วๆ

  const sql = 'SELECT booking.*, payment.payStatus, review.bookingID as bookReviewID ' +
    'FROM booking INNER JOIN payment ON booking.payID = payment.payID Left JOIN review ON booking.bookingID = review.bookingID ' +
    'WHERE payment.payStatus="completed" and booking.cleaningStatus=1 and booking.userID=?'
  connection.query(sql,[userID], function (err, results) {
    if (err) {
      console.error('Error review data:', err);
      res.status(500).send('Error review data');
      return;
    } else {
      res.send(results);
    }
  }
  );
})
});

//show create review
app.get('/ReviewBooking/:bookingID', (req, res, next) => {
  const bookingID = req.params.bookingID;
  const sql = 'SELECT bookingID, bookDate, bookTime FROM booking WHERE bookingID = ?'
  connection.query(sql, [bookingID], function (err, results) {
    if (err) return res.status(500).send('Error show');
    res.send(results);
  }
  );
});

//insert review 
app.post('/ReviewBooking/:bookingID/Submit', (req, res, next) => {
  const bookingID = req.params.bookingID;
  //const userID = 'U6011734'
  const rating = req.body.rating;
  const comments = req.body.comments;
  let reviewID;
  //date review  
  const currentDate = new Date();
  const reviewDate = currentDate.toISOString().split('T')[0];



  jwt.verify(req.headers.authorization, 'secret_key', (err, userID) => {//verify เพื่อ'ถอด'รหัส โดยใช้secret key เพื่อเข้า-ถอดรหัส 
    if (err) {
      console.error(err)
      res.status(500).send('Internal errorsss')
    }//เผื่อtoken ที่ถอดมั่วๆ

      connection.query("SELECT MAX(reviewID) AS maxReviewID FROM review WHERE reviewID LIKE 'R%'", (error, results, fields) => {
        if (error) throw error;
        let maxReviewID = results[0].maxReviewID;
        if (!maxReviewID) {
          maxReviewID = "R" + "000000000000";
        }
        // ดำเนินการสร้าง userID ถัดไป 
        reviewID = generateNextID(maxReviewID);
        connection.query(
          'INSERT INTO review(reviewID,bookingID,userID,rating,comments,reviewDate) VALUES (?,?,?,?,?,?)',
          [reviewID, bookingID, userID, rating, comments, reviewDate], function (err, results) {
            if (err) return res.status(500).send('Error updating review');
            res.send('Success');
          });
      });

    })
});

// //show review
app.get('/review', (req, res, next) => {
  
  jwt.verify(req.headers.authorization, 'secret_key', (err, userID) => {
      if (err) {
          console.error(err)
          res.status(500).send('Internal errorsss')
          return; // Exit the function if there's an error
      }

            // Define SQL query using the userID variable
            const sql = `
            SELECT 
                R.reviewID,
                R.bookingID,
                R.rating,
                R.comments,
                R.reviewDate,
                U.username,
                P.amount,
                B.bookingID
            FROM 
                Review R
            JOIN 
                Booking B ON R.bookingID = B.bookingID
            JOIN 
                Users U ON R.userID = U.userID
            JOIN 
                Payment P ON B.payID = P.payID;
        `;
  
        // Execute the SQL query
        connection.query(sql, (err, results) => {
            if (err) {
                console.error('Error fetching reviews:', err);
                res.status(500).send('Error fetching reviews');
                return;
            }
            return res.send(results);
        });
  });
});




//Show payLater
app.get('/PayLater/:bookingID', (req, res, next) => {
  const bookingID = req.params.bookingID;
  connection.query(
    'SELECT bookingID, payment.payID as bookPayID, amount, payStatus From booking INNER JOIN payment ON booking.payID=payment.payID WHERE booking.bookingID = ?',
    [bookingID],
    function (err, results) {
      if (err) {
        console.error('Error updating user data:', err);
        return res.status(500).send('Error updating user data');
      }
      res.send(results);
    }
  );
})


//Update paylater
app.put('/paymentLater/success', (req, res, next) => {
  const payID = req.body.bookPayID;
  const payStatus = req.body.payStatus;
  //Paydate PayTime 
  const currentDate_Time_Payment = new Date();
  const payDate = currentDate_Time_Payment.toISOString().split('T')[0];
  const payTime = `${currentDate_Time_Payment.getHours()}:${currentDate_Time_Payment.getMinutes()}:${currentDate_Time_Payment.getSeconds()}`;


  connection.query(
    'UPDATE payment SET payStatus = ?, payDate = ?, payTime = ? WHERE payID = ?',
    [payStatus, payDate, payTime, payID],
    function (err, results) {
      if (err) {
        console.error('Error updating user data:', err);
        res.status(500).send('Error updating user data');
        return;
      }
      res.send('Data updated successfully');
    }
  );

})


//Update Cleaning Status by user
app.put('/cleaningStatus/confirm', (req, res, next) => {
  const bookingID = req.body.bookingID;

  connection.query(
    'UPDATE booking SET cleaningStatus = ? WHERE bookingID = ?',
    [1, bookingID],
    function (err, results) {
      if (err) {
        console.error('Error updating user data:', err);
        res.status(500).send('Error updating user data');
        return;
      }
      res.send('Data updated successfully');
    }
  );

})

//Update cleaningStatus auto
app.put('/yourBooking/cleaningStatus/Success', (req, res, next) => {
  const bookingID = req.body.bookingID;
  connection.query(
    'UPDATE booking SET cleaningStatus = 1 WHERE bookingID = ?',
    [bookingID],
    function (err, results) {
      if (err) {
        console.error('Error updating user data:', err);
        res.status(500).send('Error updating user data');
        return;
      }
      res.send('Data updated successfully');
    }
  );

})


//Show Cancel data
app.get('/CancelBooking/:bookingID', (req, res, next) => {
  const bookingID = req.params.bookingID;
  connection.query(
    'SELECT bookingID, bookDate, bookTime, payment.amount * 0.75 as amount, phoneNumber From booking INNER JOIN payment ON booking.payID=payment.payID Left JOIN users ON booking.userID = users.userID WHERE booking.bookingID = ?',
    [bookingID],function (err, results) {
      if (err) {
        console.error('Error show booking data for cancle:', err);
        return res.status(500).send('Error show booking data for cancle');
      }
      res.send(results);
    }
  );
})

//Cancel booking
app.delete('/booking/cancel/:bookingID', (req, res, next) => {
  const bookingID = req.params.bookingID;
  connection.query(
    'DELETE FROM payment WHERE payID IN (SELECT payID From booking Where bookingID=?)',
    [bookingID],
    function (err, results) {
      if (err) {
        console.error('Error delete booking data:', err);
        return res.status(500).send('Error delete booking data for cancel');
      }
      res.send("Success");
    }
  );

})


app.listen(port, () => {
  console.log(`Server start at post ${port}`);
});