const mongoose = require("mongoose");
const contactSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    },
    phone_number: {
      type: String,
      required: true,
      match: /^\+?([0-9]{1,3})?[- ]?([0-9]{1,14})$/,
    },
    subject_name: {
      type: String,
      required: true,
    },
    note: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "Not processed yet",
    },
  },
  {
    timestamps: true,
  }
);
const Contact = mongoose.model("Contact", contactSchema);
module.exports = Contact;
