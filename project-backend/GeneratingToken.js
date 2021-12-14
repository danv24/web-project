require('dotenv').config()
const jwt = require('jsonwebtoken')

// creating a access token using jwt library and the secret from the .env file
const generateAccessToken = (user)=>{
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '900s'})
  }
  
  // creating a refresh token using jwt library and the secret from the .env file
  const generateRefreshToken = (user)=>{
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
  }

  module.exports = {generateAccessToken,generateRefreshToken}