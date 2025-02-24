const mongoose = require("mongoose");
const brandSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please enter a brand title"],
      unique: [true, "Brand already exists"],
      index: true,
    },
  },
  {
    timestamps: true,
  }
);
const Brand = mongoose.model("Brand", brandSchema);

module.exports = Brand;
