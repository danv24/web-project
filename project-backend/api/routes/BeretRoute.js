const express = require("express");
const router = express.Router()

const Beret = require("../models/Beret");
const {verify} = require('../../Middleware')


router.put("/:id",verify, async (req,res) =>{
    if(!req.user.permissions.includes("katzi-team")) return res.status(401).json("You dont have access!");

    try{
        const object = {
            stock: req.body.stock,
            item:  req.body.item
        }
        const id = req.params.id
       const options = { upsert: true } 
    console.log(req.params.id)
    await Beret.findByIdAndUpdate(id,object, options)
    res.send("item has been succesfully updated")
}catch(err){
    res.send(err)
}
    
} )


router.get("/",verify, async (req,res)=>{
    try{
         const beret = await Beret.find({});
         res.send(beret)
    }catch(err){
        console.log(err)
    }
})


router.get("/:id",verify, async (req, res)=>{
    try{
         const beret = await Beret.find({item: req.params.id});
        res.send(beret)
    }catch(err){
        res.send(err)
    }
})

module.exports = router;