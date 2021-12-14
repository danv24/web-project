const express = require("express");
const router = express.Router()
// importing the event collections
const Event = require("../models/Event");
const {verify} = require('../../Middleware')

//post route to catch the data from the client and insert it into the event colection as a document
router.post("/",verify, async (req,res) =>{
    if(!req.user.permissions.includes("calender")) return res.status(401).json("You dont have access!");

    try{
    console.log(req.body)
    const event =  new Event({
        title: req.body.title,
        content:req.body.content,
        start:req.body.start,
        end:req.body.end
    })
    await event.save();
    res.sendStatus(201)
}catch(err){
    res.send(err)
}
    
} )

// sending all the events (documnets)from the events collection
router.get("/",verify, async (req,res)=>{
    try{
    const events = await Event.find({  });
    res.send(events);
    }catch(err){
        res.send(err)
    }
})

//delete route, the route changes according to the event id, takes the event id from the url and deletes the event using 
//finfByIdAndDelete
router.delete('/:id',verify, async (req, res) => {
    if(!req.user.permissions.includes("calender")) return res.status(401).json("You dont have access!");

    try{
    await Event.findByIdAndDelete(req.params.id)
      res.send("item has been deleted succesfully")
      console.log(req.params.id)
    }catch(err){
        res.send(err)
    }
  });
module.exports= router;