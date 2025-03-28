const mongoose = require("mongoose");
const blogCategorySchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);
const blogCategory = mongoose.model("blogCategory", blogCategorySchema);

module.exports = blogCategory;
