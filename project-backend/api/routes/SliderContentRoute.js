const express = require("express");
const router = express.Router();
const {verify} = require('../../Middleware')

const SliderContent = require("../models/SliderContent")


router.post("/",verify, async (req,res)=>{
   
    if(!req.user.permissions.includes("home-page")) return res.status(401).json("You dont have access!");
    try{
    const sliderContent = new SliderContent ({
        content: req.body.content
    })
    await sliderContent.save()
    res.send("item has been added successfully")
}catch(err){
    res.send(err)
}
})


router.get("/",verify, async (req,res)=>{
    try{
    const content =  await SliderContent.find({})
    res.send(content)
    }catch(err){
        res.send(err)
    }
})

router.delete('/:content',verify, async (req, res) => {
    if(!req.user.permissions.includes("home-page")) return res.status(401).json("You dont have access!");

    try{
    await SliderContent.deleteOne({content:req.params.content})
      res.send("item has been deleted succesfully")
    }catch(err){
        res.send(err)
    }
  });
module.exports = router