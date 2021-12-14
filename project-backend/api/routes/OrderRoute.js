const express = require("express");
const router = express.Router();
const {verify} = require('../../Middleware')

const Order = require ("../models/Order")

router.post("/",verify, async (req,res)=>{

    try{
       
    const order = new Order ({
            item: req.body.item,
             type: req.body.type,
            size: req.body.size,
            username: req.body.username,
            status: req.body.status
    })
    await order.save()
    res.send(req.body)
}catch(err){
    res.send(err)
}
  
})
router.get("/",verify,async (req,res)=>{
    try{
    const order = await Order.find({}) 
    res.send(order)
    }catch(err){
        console.log(err)
    }
})

router.get("/:id", verify,async (req,res)=>{
    try{
    const order = await Order.find({username: req.params.id}) 
    res.send(order)
    }catch(err){
        console.log(err)
    }
})

router.patch("/:id",verify,async (req,res)=>{
    if(!req.user.permissions.includes("katzi-team")) return res.status(401).json("You dont have access!");

    const id = req.params.id

    const object = {
        status: "אושר"
    }

    try{
    const item = await Order.findByIdAndUpdate(id, object)
    res.send("item has been succeslfully updated")
    }catch(err){
        res.send(err)
    }
})

//delete route, the route changes according to the order id, takes the order id from the url and deletes the order using 
//finfByIdAndDelete
router.delete('/:id', verify,async (req, res) => {
    try{
    if(!req.user.permissions.includes("katzi-team")) return res.status(401).json("You dont have access!");

    //   console.log(req.params.id)
    await Order.findByIdAndDelete(req.params.id)
      res.send("item has been deleted succesfully")
    }catch(err){
        res.send(err)
    }
  });

module.exports = router;