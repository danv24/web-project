const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema({
    roomname: {
        type: String,
        require: true,
        min: 3,
        max: 20,
        unique: true,
      },
      members: {
        type: Array,
        require: true
      },
      password: {
          type: String,
          required: true
      }
},
// Mongoose schemas have a timestamps option that tells Mongoose to 
//automatically manage createdAt and updatedAt properties on your documents
{ timestamps: true }
)

module.exports = mongoose.model("Room", RoomSchema);
