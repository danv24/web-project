const mongoose = require("mongoose");

const OrdersSchema = mongoose.Schema({
    item: String,
    type: String,
    size: String,
    username: String,
    status: String
})

const Order = mongoose.model("order", OrdersSchema);

module.exports = Order;