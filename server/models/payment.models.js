const mongoose = require("mongoose");
const paymentSchema = new mongoose.Schema({});

const Payment = mongoose.model("Payment", paymentSchema);
module.exports = Payment;
