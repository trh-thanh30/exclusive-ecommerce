const mongoose = require("mongoose");

const vietnamPhoneRegex =
  /^(?:\+84|0)(3[2-9]|5[2689]|7[0-9]|8[1-9]|9[0-9])[0-9]{7}$/;

const orderSchema = new mongoose.Schema(
  {
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        count: Number,
        color: String,
      },
    ],
    orderStatus: {
      type: String,
      default: "Not Processed",
      enum: [
        "Not Processed",
        "Processing",
        "Dispatched",
        "Completed",
        "Cancelled",
        "Cash On Delivery",
      ],
    },
    orderByUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    userInformation: {
      lastName: {
        type: String,
        required: true,
      },
      firstName: {
        type: String,
        required: true,
      },
      phoneNumber: {
        type: String, 
        required: true,
        validate: {
          validator: function (v) {
            return vietnamPhoneRegex.test(v);
          },
          message: "Invalid phone number format!",
        },
      },
    },
    shippingAddress: {
      province: {
        type: String,
        required: true,
      },
      district: {
        type: String,
        required: true,
      },
      commune: {
        type: String,
        required: true,
      },
      detailAddress: {
        type: String,
        required: true,
      },
    },
    paymentMethod: {
      type: String,
      enum: ["COD", "PAY"],
      default: "COD",
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
