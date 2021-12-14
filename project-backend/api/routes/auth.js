const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
const RefreshToken  = require('../models/RefreshToken')
require('dotenv').config()

const {generateAccessToken,generateRefreshToken} = require('../../GeneratingToken')
const {verify} = require('../../Middleware')


//REGISTER
router.post("/register", async (req, res) => {
  try {
    //generate new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //create new user
    const newUser = new User({
      username: req.body.username,
      password: hashedPassword,
    });
    console.log(newUser)

    //save user and respond
    const user = await newUser.save();
    console.log("works")
    res.status(200).json(user);
    console.log(user)
  } catch (err) {
    console.log("doesnt work")
    res.status(500).json(err)
  }
});


// getting a new access token using a refresh token
router.get("/refresh", async (req, res) => {
  //take the refresh token from the user
  const refreshToken = req.cookies.refreshToken;
  

  //send error if there is no token or it's invalid
  if (!refreshToken) return res.status(401).json("You are not authenticated!");


  const checkToken = await RefreshToken.find({token: refreshToken})

  
  if(!checkToken) return res.status(403).json("Refresh token is not valid!");


  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    err && console.log(err);

    
    const tokenUser = {
      _id: user._id,
      username: user.username,
      permissions: user.permissions,
      isAdmin: user.isAdmin
    }


    const newAccessToken = generateAccessToken(tokenUser);

    // res.cookie('accessToken',newAccessToken,{
    //   httpOnly: true,
    
    // })
    res.status(200).json(newAccessToken);
  });

  //if everything is ok, create new access token, refresh token and send to user
});


//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    !user && res.status(404).json("user not found");
    console.log(user)
    const validPassword = await bcrypt.compare(req.body.password, user.password)
    !validPassword && res.status(400).json("wrong password")

    console.log(user)
    // cerating a user object that containts username and permission only
    const tokenUser = {
      _id: user._id,
      username: user.username,
      permissions: user.permissions,
      isAdmin: user.isAdmin
    }  
    console.log(tokenUser)
      //Generate an access token and a refresh token using the functions
      const accessToken = generateAccessToken(tokenUser);
      const refreshToken = generateRefreshToken(tokenUser);

   console.log(accessToken)
      // entering the refresh token into the db collection
      const newRefreshToken = new RefreshToken({
        token: refreshToken
      })

      await newRefreshToken.save()


    // res.cookie('accessToken',accessToken,{
    //   httpOnly: true,
    
    // })
    res.cookie('refreshToken',refreshToken,{
      httpOnly: true,
    
    })
    
    res.status(200).json(accessToken)

    
  } catch (err) {
    res.status(500).json(err)
  }
});



router.delete("/delete/:username", verify, (req, res) => {
  console.log(req.user)
  if (req.user.name === req.params.username) {
    res.status(200).json("User has been deleted.");
  } else {
    res.status(403).json("You are not allowed to delete this user!");
  }
});

module.exports = router;