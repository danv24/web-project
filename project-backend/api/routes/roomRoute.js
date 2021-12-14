const express = require("express");
const router = express.Router()
const bcrypt = require("bcrypt");
const {verify} = require('../../Middleware')

// requring the room collection
const Room = require("../models/Room")


// route to create a new room
// the room consists of 3 parameters ()
router.post('/',verify ,async (req,res)=>{

    try{
            //generate new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);


    const room = new Room ({
        roomname: req.body.roomname,
        members: [req.body.userId],
        password : hashedPassword

    })
    
    const savedRoom = await room.save()
    res.status(200).json(savedRoom);
    }catch(err){
        res.status(400).json(err)
    }
})


router.patch('/',verify ,async (req,res)=>{
    try{
      // checking if the entered room name exists if not returns an error
         const room = await Room.findOne({ roomname: req.body.roomname });
        !room && res.status(404).json("user not found");

        // checking if the user is already in the room
        const chatroom = await Room.findOne({ members: { $in: [req.body.userId]},_id: room.id});
        chatroom && res.status(400).json("user is alreay in the room")
        console.log(chatroom)

      // checking if the entered passward is the correct one
        const validPassword = await bcrypt.compare(req.body.password, room.password)
    !validPassword && res.status(400).json("wrong password")
     
    // if the is a room with the same roomname as the clients input, the password the client entered is valid and
    // the user does not existss in the room then updare the room and add the user to the members
    if(room && validPassword && !chatroom){
     const updatedRoom = await Room.findByIdAndUpdate(room.id,{members:[...room.members, req.body.userId]})
        res.status(200).json(updatedRoom)
    }

    }catch(err){
        res.status(400).json(err)
    }
})

//get room of a user using user id
router.get("/:userId",verify, async (req, res) => {
    // try and catch to handle errors, send back a success or error message depending on the outcome
    try {
      // taking the users id from the url and and using it in .find method to find al of his rooms
      const rooms = await Room.find({
        // The $in operator selects the documents where the value of a field equals any value in the specified array
        members: { $in: [req.params.userId] },
      });
      res.status(200).json(rooms);
    } catch (err) {
      res.status(500).json(err);
    }
  });


  router.patch("/exist",verify ,async (req, res)=>{
    try{
      const room = await Room.findById({_id : req.body.roomId})
      newMembers = room.members
      const index =  newMembers.indexOf(req.body.userId)
      if (index > -1) {
        newMembers.splice(index, 1);
        
      }
      const updatedRoom = await Room.findByIdAndUpdate(req.body.roomId, {members: newMembers})

      res.json(updatedRoom)
      
    }catch(err)
    {
      res.status(500).json(err)
    }
  })

module.exports = router