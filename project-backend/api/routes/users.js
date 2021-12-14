const User = require("../models/User");
const router = require("express").Router();
const bcrypt = require("bcrypt");
const { verify } = require("../../Middleware");

//update user
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        return res.status(500).json(err);
      }
    }
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json("Account has been updated");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can update only your account!");
  }
});

//delete user
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("Account has been deleted");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can delete only your account!");
  }
});

//get a user
router.get("/", verify,async (req, res) => {
  const userId = req.query.userId;
  const username = req.query.username;
  try {
    const user = userId
    // if there is a user id use findById else use .findOne and pass the username as a query
      ? await User.findById(userId)
      : await User.findOne({ username: username });
    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get user by username
router.get("/:username",verify, async (req, res) => {
  console.log("works")
  try {
    const user = await User.find({username: req.params.username});
    if(user.length > 0){
      console.log()
    res.status(200).json(user)
    }
    else{
      res.status(400)
    }
  } catch (err) {
    res.status(500).json(err);
  }
});




module.exports = router;
