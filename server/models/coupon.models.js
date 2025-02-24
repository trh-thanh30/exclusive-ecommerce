const mongoose = require("mongoose");
const couponSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
  },
  exp: {
    type: Date,
    required: true,
    validate: {
      validator: (value) => value > new Date(),
      message: "Coupon must have a valid expiration date.",
    },
  },
  discount: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
});
