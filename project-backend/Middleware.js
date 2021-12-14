require('dotenv').config()
const jwt = require('jsonwebtoken')

// a midllewear that authenticates the jwt token
const verify = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];


      // verifiyng if the token is legit and hasnt been mess with
      // the thirs parameter is a callback function that has 2 parameters (error, the paload form the jwt)
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
       
        if (err) {
          return res.status(403).json("Token is not valid!");
        }
        // in out case the payload from the jwt is a user object so we define req.user as user(payload)
        req.user = user;
        console.log(user)
        next();
      });
    } else {
      console.log("here")
      res.status(401).json("You are not authenticated!");
    }
  };

  module.exports = {verify}