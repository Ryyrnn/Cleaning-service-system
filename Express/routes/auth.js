const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const connection = require('../database')
const saltRounds = 10;
const generateNextID = require('../utils/generateNextId')
router.post('/signIn',  (req, res) => {
    const username= req.body.username;
    const password= req.body.password;
    
    // const {username, password} = req.body
  
    if(!username || !password) return res.status(400).send('Username and Password are required')//ต้องมี username and pass
    const sql= 'SELECT * FROM users WHERE username=?'
    connection.query(sql, [username], async (err,result) => {
    
    if(err) {
      console.error(err)
      return res.status(500).send('Internal errors')
    }
  
    if(result.length === 0/*ไม่ตรงในdata base*/ || !await bcrypt.compare(password,result[0].password)){
  
      return res.status(401).send('Invalid username or password') 
      // if()) return res.status(409).send('Invalid username or password')
      //status ok +if not ok =409 //ลดความซ้ำซ้อน จับมารวมกันแล้ว409ทีเดียวเลย
    }

    const token = jwt.sign(result[0].userID,'secret_key')//sign=create token
    res.send(token)
    })

  
});

// sign up
router.post('/signup', async (req, res, next) => {
  let userID;
  const {username,email,password,firstname,lastname,phoneNumber} = req.body;

  //chech Username already used?
  const sql= 'SELECT * FROM users WHERE username=?'
  connection.query(sql, [username], async (err,result) => {

    if(err) {
      console.error(err)
      return res.status(500).send('Internal errors')
    }

    if(result.length >0/*แปลว่าซ้ำ*/) return res.status(409).send('Username already in used.')

    const hashPass = await bcrypt.hash(password,saltRounds)


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
    [userID,username,hashPass,email,firstname,lastname,phoneNumber],
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

module.exports = router