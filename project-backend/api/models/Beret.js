const mongoose = require("mongoose")

const BeretSchema = mongoose.Schema({
    _id: String,
    item: String,
    stock: String
})

const Beret = mongoose.model("beret", BeretSchema);

module.exports = Beret