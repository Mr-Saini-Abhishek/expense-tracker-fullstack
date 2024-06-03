const express = require('express');
const bcrypt = require('bcryptjs')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const fetchuser = require('../middleware/fetchuser')
const router = express.Router();
const { body, validationResult } = require('express-validator')
const JWT_secret = 'mr.error';

// Route : 1 || creating a user with validation 

router.post('/createuser', [

  body('name', 'Name contain must be 3 Charachters').isLength({ min: 3 }),
  body('email', 'Enter a unique and valid Email').isEmail(),
  body('password', 'It contain must be 5 Charachters').isLength({ min: 5 })
],  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }
    try {
      const existUser = await User.findOne({ email: req.body.email });
      if (existUser) {
        return res.status(400).json({ success, err: "SORRY A USER WITH THE EMAIL ALREADY EXIST " })

      }
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt)

      const newUser = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,

      })


      const data = {
        user: {
          id: newUser.id
        }
      }
      const authtoken = jwt.sign(data, JWT_secret);
      success = true;
      res.json({success, authtoken})

    } catch (error) {
      console.error(error.message)
      res.status(500).send("SOME ERROR OCCURED")
    }
  });
// Route : 2 || login a user with valid credentials 
router.post('/login', [
body('email', 'Enter a Valid Email').isEmail(),
body('password', 'Password Can not be blanked').exists()
], async (req, res) =>{
  let success = false;
const errors = validationResult(req);
if(!errors.isEmpty()){
  return res.status(400).json({errors: errors.array()});

}
const {email, password} = req.body
try{
  let user =  await User.findOne({email})
  if(!user){
    success: false
    return res.status(400).json({error: "please try to login with correct Credentials"})
  }
  const  passwordCompare = await bcrypt.compare(password, user.password);
  if(!passwordCompare){
    return res.status(400).json({error: "please try to login with correct Credentials"})
  }
const data = {
  user :{
    id: user.id
  }
}
const authtoken = jwt.sign(data, JWT_secret)
success = true;
res.json({success, authtoken})

}catch(error){
  console.error(error.message);
  res.status(500).send("Internal Server Error")
}
})


// Route : 3 || getting a user from token 

router.post('/getuser', fetchuser, async (req, res) => {
  try{ 
     userId = req.user.id;
  
    const user = await User.findById(userId).select("-password")
    res.send(user)

  }catch(error){
    console.error(error.message)
    res.status(500).send("internal server Error");
  }
})


module.exports = router