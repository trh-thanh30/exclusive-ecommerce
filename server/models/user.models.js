const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      maxlength: [25, "Your first name must be at most 25 characters"],
      minlength: [1, "Your firt name must be at least 1 character"],
    },
    lastname: {
      type: String,
      maxlength: [25, "Your last name must be at most 25 characters"],
      minlength: [1, "Your last name must be at least 1 character"],
    },
    username: {
      type: String,
      required: true,
      minlength: [10, "Username must be at least 10 characters"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Invalid email format",
      ],
    },
    password: {
      type: String,
      required: function () {
        return !this.googleId;
      },
      minlength: [8, "Password must be at least 8 characters"],
    },
    avatar: {
      type: String,
      default: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
    },
    address: {
      type: String,
      required: false,
    },
    phone_number: {
      type: String,
      required: false,
      match: [
        /^\+?([0-9]{1,3})?[-. ]?([0-9]{1,14})$/,
        "Invalid phone number format",
      ],
    },
    is_blocked: {
      type: Boolean,
      default: false,
    },
    role_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
      required: true,
    },
    role_name: {
      type: String,
      required: true,
    },
    googleId: {
      type: String,
    },
    wishList: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "  ",
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
