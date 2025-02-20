const mongoose = require("mongoose");
const contactSchema = new mongoose.Schema(
  {
    userInformations: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
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
