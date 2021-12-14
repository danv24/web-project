const mongoose = require('mongoose');

//creating a image schema and collection and exporting it
const imageSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    image: { type: String, required: true }
});

module.exports = mongoose.model('Image', imageSchema);