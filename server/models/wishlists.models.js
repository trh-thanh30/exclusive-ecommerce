const mongoose = require("mongoose");
const wishListsSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  {
    timestamps: true,
  }
);
const WishList = mongoose.model("Wishlists", wishListsSchema);

module.exports = WishList;
