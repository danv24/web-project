const express = require("express");
const router = express.Router()

const AlefUniform = require("../models/AlefUniform")

router.put("/:id", async (req,res)=>{
    try{
        const object = {
            _id: req.params.id,
            sex: req.body.sex,
            item: req.body.alefItem,
            size: req.body.alefSize,
            stock: req.body.alefStock
        }
        const id = req.params.id
       const options = { upsert: true } 
    console.log(req.params.id)
    await AlefUniform.findByIdAndUpdate(id,object, options)
    res.send("item has been succesfully updated")
}catch(err){
    res.send(err)
}
    
} )


router.get("/:sex/:item", async (req, res)=>{
    try{
        const alefUniforms = await AlefUniform.find({item: req.params.item, sex:req.params.sex});
       res.send(alefUniforms)
   }catch(err){
       res.send(err)
   }
})


module.exports = router;