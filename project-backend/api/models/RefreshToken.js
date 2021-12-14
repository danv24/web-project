const mongoose = require("mongoose")

//creating an event schema and collection and expporting it
const refreshTokenSchema = mongoose.Schema({
    token: String
})

const RefreshToken = mongoose.model("refreshToken", refreshTokenSchema);

module.exports = RefreshToken;