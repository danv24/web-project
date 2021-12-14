const express = require("express");
const router = express.Router()

const BetUniform = require("../models/BetUniform");
const {verify} = require('../../Middleware')


router.put("/:id",verify, async (req,res) =>{
    if(!req.user.permissions.includes("katzi-team")) return res.status(401).json("You dont have access!");

    try{
        const object = {
            _id: req.params.id,
            item: req.body.item,
            size: req.body.size,
            stock: req.body.stock
        }
        const id = req.params.id
       const options = { upsert: true } 
    console.log(req.params.id)
    await BetUniform.findByIdAndUpdate(id,object, options)
    res.send("item has been succesfully updated")
}catch(err){
    res.send(err)
}
    
} )

router.get("/",verify, async (req, res)=>{
    try{
         const betUniforms = await BetUniform.find({});
        res.send(betUniforms)
    }catch(err){
        res.send(err)
    }
})

router.get("/:id",verify, async (req, res)=>{
    try{
         const betUniforms = await BetUniform.find({item: req.params.id});
        res.send(betUniforms)
    }catch(err){
        res.send(err)
    }
})

module.exports = router;