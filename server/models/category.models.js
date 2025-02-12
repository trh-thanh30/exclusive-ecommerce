const { default: mongoose } = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    titel: {
      type: String,
      require: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);
const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
