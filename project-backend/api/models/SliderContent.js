const mongoose = require("mongoose")

const SliderContentSchema = mongoose.Schema({
    content: String
})

const SliderContent = mongoose.model("slidercontent", SliderContentSchema)


module.exports = SliderContent;