const mongoose = require("mongoose");

// a schema of the message
const MessageSchema = new mongoose.Schema(
  {
    // th id of the convesation to llow us to targest a specific socket
    conversationId: {
      type: String,
    },
    // the name of the message sender
    sender: {
      type: String,
    },
    senderName: {
      type: String,
    },
    // the ext message
    text: {
      type: String,
    },
  },
  // Mongoose schemas have a timestamps option that tells Mongoose to 
  //automatically manage createdAt and updatedAt properties on your documents
  { timestamps: true }
);

module.exports = mongoose.model("Message", MessageSchema);
