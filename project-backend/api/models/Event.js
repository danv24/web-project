const mongoose = require("mongoose")
//creating an event schema and collection and expporting it
const eventSchema = mongoose.Schema({
    start: Date,
    end: Date,
    title: String,
    content: String
})

const Event = mongoose.model("Event", eventSchema);

module.exports = Event