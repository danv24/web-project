const mongoose = require("mongoose")

const AlefUniformSchema = mongoose.Schema({
    _id: String,
    sex: String,
    item: String,
    size: String,
    stock: String
})

const AlefUniform = mongoose.model("alefUniform", AlefUniformSchema)

module.exports =AlefUniform