const express = require("express");
const router = express.Router()
// requiring the Message collection
const Message = require("../models/Message");
const {verify} = require('../../Middleware')

// adding a new message
router.post("/",verify, async (req, res) => {
  console.log(req.body)
  //  creating a new message item using req.body (caontains: conversation id, sender name and text)
  const newMessage = new Message(req.body);
  // try and catch to handle errors, send back a success or error message depending on the outcome
  try {
    const savedMessage = await newMessage.save();
    res.status(200).json(savedMessage);
  } catch (err) {
    res.status(500).json(err);
  }
});



//geting the messages of a particullar convesation
router.get("/:conversationId",verify, async (req, res) => {

  
  // try and catch to handle errors, send back a success or error message depending on the outcome
  try {
    // taking the convesation id from the url and using .find to get all the messages
    const messages = await Message.find({
      conversationId: req.params.conversationId,
    });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
