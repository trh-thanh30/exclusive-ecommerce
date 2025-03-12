const Cart = require("../models/cart.models");
const Coupon = require("../models/coupon.models");
const Product = require("../models/products.models");
const User = require("../models/user.models");

const addToCart = async (req, res) => {
  try {
    const { id } = req.user;
    const { cart } = req.body;
    let products = [];
    const user = await User.findById(id);
    await Cart.deleteOne({ user: user.id });
    for (let i = 0; i < cart.length; i++) {
      let object = {};
      object.product = cart[i]._id;
      object.quantity = cart[i].quantity;
      object.color = cart[i].color;
      object.size = cart[i].size;
      let getPrice = await Product.findById(cart[i]._id).select("price").exec();
      object.price = getPrice.price;
      object.priceAfterQuantity = getPrice.price * cart[i].quantity;
      products.push(object);
    }
    let cartTotal = 0;
    for (let i = 0; i < products.length; i++) {
      cartTotal += products[i].price * products[i].quantity;
    }
    const newCart = new Cart({
      user: user.id,
      products: products,
      totalPriceCart: cartTotal,
    });
    await newCart.save();
    return res
      .status(201)
      .json({ message: "Product added to cart successfully", newCart });
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
    return res.status(200).json({ cart });
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
