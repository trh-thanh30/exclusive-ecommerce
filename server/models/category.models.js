const { default: mongoose } = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: [true, "Please enter a category title"],
      unique: [true, "Category already exists"],
      index: true,
    },
  },
  {
    timestamps: true,
  }
);
const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
