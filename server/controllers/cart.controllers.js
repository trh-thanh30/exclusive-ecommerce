const Cart = require("../models/cart.models");
const Coupon = require("../models/coupon.models");
const Product = require("../models/products.models");
const User = require("../models/user.models");

const addToCart = async (req, res) => {
  try {
    const { id } = req.user;
    const { cart } = req.body;
    if (!cart || !Array.isArray(cart) || cart.length === 0) {
      return res.status(400).json({ message: "Cart is empty or invalid" });
    }
    const user = await User.findById(id);
    if (!user)
      return res
        .status(404)
        .json({ message: "Please sign in or sign up to add to cart!!! " });
    let existingCart = await Cart.findOne({ user: user.id });
    if (!existingCart) {
      existingCart = new Cart({
        user: user.id,
        products: [],
        totalPriceCart: 0,
      });
    }
    for (let i = 0; i < cart.length; i++) {
      let { _id, quantity, color, size } = cart[i];
      quantity = parseInt(quantity);
      let getPrice = await Product.findById(_id).select("price").exec();
      if (!getPrice) return;
      let productIndex = existingCart.products.findIndex(
        (item) =>
          item.product.toString() === _id &&
          item.color === color &&
          item.size === size
      );
      if (productIndex !== -1) {
        existingCart.products[productIndex].quantity += quantity;
        existingCart.products[productIndex].priceAfterQuantity =
          getPrice.price * existingCart.products[productIndex].quantity;
      } else {
        existingCart.products.push({
          product: _id,
          quantity,
          color,
          size,
          price: getPrice.price,
          priceAfterQuantity: getPrice.price * quantity,
        });
      }
      existingCart.totalPriceCart = existingCart.products.reduce(
        (total, item) => total + item.priceAfterQuantity,
        0
      );
      await existingCart.save();
      return res.status(200).json({
        message: "Product added to cart successfully",
        cart: existingCart,
      });
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const applyCoupon = async (req, res) => {
  try {
    const { id } = req.user;
    const { code } = req.body;

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });
    const cart = await Cart.findOne({ user: user.id }).populate(
      "products.product"
    );
    if (!cart) return res.status(404).json({ message: "Cart not found" });
    const codeCoupon = await Coupon.findOne({ code });
    if (!codeCoupon)
      return res.status(404).json({ message: "Coupon not found" });
    let { totalPriceCart } = cart;
    let priceDiscount = totalPriceCart * (codeCoupon.discount / 100);
    let totalAfterDiscount =
      totalPriceCart - parseFloat(priceDiscount.toFixed(3));
    await Cart.findOneAndUpdate(
      { user: user.id },
      { totalAfterDiscount },
      { new: true }
    );
    return res.status(200).json({
      message: "Apply coupon for the products successfully",
      totalAfterDiscount,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
const getCart = async (req, res) => {
  try {
    const { id } = req.user;
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });
    const cart = await Cart.findOne({ user: user.id }).populate(
      "products.product"
    );
    if (!cart) return res.status(404).json({ message: "Cart not found" });
    return res.status(200).json({ cart, cartLength: cart.products.length });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
const emptyCart = async (req, res) => {
  try {
    const { id } = req.user;
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });
    const cart = await Cart.findOneAndReplace({ user: user.id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });
    return res.status(200).json({ message: "Cart emptied successfully", cart });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
module.exports = {
  addToCart,
  applyCoupon,
  getCart,
  emptyCart,
};
