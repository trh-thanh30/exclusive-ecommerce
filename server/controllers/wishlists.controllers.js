const Product = require("../models/products.models");
const User = require("../models/user.models");

const wishLists = async (req, res) => {
  try {
    const { id } = req.user;
    const { productId } = req.body;
    const user = await User.findById(id);
    const allreadyAddToWishList = user.wishList.find(
      (id) => id.toString() === productId
    );
    if (allreadyAddToWishList) {
      await User.findByIdAndUpdate(
        id,
        {
          $pull: { wishList: productId },
        },
        {
          new: true,
        }
      );
      return res.status(200).json({ message: "Product removed from wishlist" });
    } else {
      await User.findByIdAndUpdate(
        id,
        {
          $push: { wishList: productId },
        },
        { new: true }
      );
      return res.status(200).json({ message: "Product added to wishlist" });
    }
  } catch (error) {
    return res.status(400).json({ messge: error.message });
  }
};
const getAllWishLists = async (req, res) => {
  try {
    const { id } = req.user;
    const user = await User.findById(id);

    if (user.wishList.length === 0 || !user) {
      return res.status(402).json({
        messaage: "You don't have any products in your favorites list yet!!!",
      });
    }
    // Pagination
    let { limit, page } = req.query;
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;
    const skip = (page - 1) * limit;
    const products = await Product.find({ _id: { $in: user.wishList } })
      .skip(skip)
      .limit(limit);
    return res.status(200).json({
      products,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(user.wishList.length / limit),
        totalProducts: user.wishList.length,
        pageSize: limit,
      },
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
module.exports = { wishLists, getAllWishLists };
