const router = require("express").Router();
const Conversation = require("../models/Conversation");
const {verify} = require('../../Middleware')

//creating a new conversaton
router.post("/",verify, async (req, res) => {
  // taking the the sender and reciver id and creating a new item in the Conversation collection
  console.log(req.body.senderId, req.body.receiverId)
  const newConversation = new Conversation({
    members: [req.body.senderId, req.body.receiverId],
  });
  // try and catch to handle errors
  try {
    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get convesations of a user using user id
router.get("/:userId",verify, async (req, res) => {
  // try and catch to handle errors, send back a success or error message depending on the outcome
  try {
    // taking the users id from the url and and using it in .find method to find al of his covesations
    const conversation = await Conversation.find({
      // The $in operator selects the documents where the value of a field equals any value in the specified array
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get conversation that includes two userId

router.get("/find/:firstUserId/:secondUserId",verify, async (req, res) => {
  // try and catch to handle errors, send back a success or error message depending on the outcome
  try {
    // taking the sender and the reciever id and using .findOne to find their convesation
    const conversation = await Conversation.findOne({
      // The $all operator selects the documents where the value of a field is an array that contains all the specified
      members: { $all: [req.params.firstUserId, req.params.secondUserId] },
    });
    res.status(200).json(conversation)
  } catch (err) {
    res.status(500).json(err);
  }
});
// exportin the module
module.exports = router;
