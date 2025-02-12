const { default: mongoose } = require("mongoose");

const productsSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    discount: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    size: {
      type: String,
      enum: ["S", "M", "L", "XL", "XXL"],
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    category_id: {
      type: String,
      required: true,
      ref: "Category",
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productsSchema);
module.exports = Product;
