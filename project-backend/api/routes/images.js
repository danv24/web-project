const express = require("express");
const router = express.Router()
const mongoose = require("mongoose");
const {verify} = require('../../Middleware')

//multer is a packege that allows us to post files to our data base
const multer = require('multer');
// const upload = multer({dest: "uploads/"})
const storage = multer.diskStorage({
    //creating a folder which will be the destenation of the files we get
    destination: function(req, file, cb) {
      cb(null, './uploads/');
    },
    //we can set the name of the file, to original name
    filename: function(req, file, cb) {
      cb(null,file.originalname);
    }
  });
  //filtering which file the api accepts and which one it rejects, cb (callback)
  const fileFilter = (req, file, cb) => {
    // accepting a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
      //rejecting a file 
    } else {
      cb(null, false);
    }
  };
   //activating the packege so we can upload files, ths can take 3 parametars: storage, limits, and file filter
  const upload = multer({
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
  });
  


  //requiring the image model
  const Image = require("../models/images");


//get route to send all the images url to the frontend on a get request
  router.get("/", (req, res, ) => {
    Image.find({})
      .exec()
      .then(docs => {
        res.status(200).json(docs);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });

// posting the url of the image in the image collection and storing the image inside the uploads folder
router.post("/", [verify,upload.single('image')], (req, res, ) => {
    console.log(req.file)
    const image = new Image({
      _id: new mongoose.Types.ObjectId(),
      image: req.file.path 
    });
    image
      .save()
      .then(result => {
        console.log(result);
        res.status(201).json({
          message: "Created product successfully",
          createdProduct: {
              _id: result._id,
              
          }
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });


  router.delete('/:id',verify, async (req, res) => {
    try{
    await Image.findByIdAndDelete(req.params.id)
      res.send("item has been deleted succesfully")
      console.log(req.params.id)
    }catch(err){
        res.send(err)
    }
  });

module.exports = router;