const mongoose = require("mongoose")

//creating an event schema and collection and expporting it
const betUniformSchema = mongoose.Schema({
    _id: String,
    item: String,
    size: String,
    stock: String
})

const BetUniform = mongoose.model("BetUniform", betUniformSchema);

module.exports = BetUniform;