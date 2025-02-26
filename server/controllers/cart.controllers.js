const Cart = require("../models/cart.models");
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
    console.log(products);
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
module.exports = {
  addToCart,
};
