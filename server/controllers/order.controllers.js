const Cart = require("../models/cart.models");
const Order = require("../models/order.models");
const Product = require("../models/products.models");

const createOrder = async (req, res) => {
  try {
    const { id } = req.user;
    const { shippingAddress, paymentMethod, appliedCoupon, userInformation } =
      req.body;
    if (
      !userInformation.phoneNumber ||
      !userInformation.firstName ||
      !userInformation.lastName ||
      !userInformation.email
    ) {
      return res.status(400).json({
        message: "Please provide user information",
        failInfo: true,
      });
    }
    if (
      !shippingAddress.province ||
      !shippingAddress.district ||
      !shippingAddress.commune ||
      !shippingAddress.detailAddress
    ) {
      return res.status(400).json({
        message: "Please provide a shipping address",
        failAddress: true,
      });
    }

    if (!paymentMethod) {
      return res.status(400).json({
        message: "Please provide a payment method",
        failPaymentMethod: true,
      });
    }
    const userCart = await Cart.findOne({ user: id });
    const productId = userCart.products?.map((item) => item.product);
    const getCount = userCart.products?.map((item) => item.quantity);
    console.log(getCount);
    await Product.findByIdAndUpdate(productId, {
      $inc: { quantity: -getCount },
    });
    let totalAmount = 0;
    if (!userCart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    if (appliedCoupon && userCart.totalAfterDiscount) {
      totalAmount = userCart.totalAfterDiscount;
    } else {
      totalAmount = userCart.totalPriceCart;
    }
    const order = new Order({
      products: userCart.products.map((item) => {
        return {
          product: item.product,
          count: item.quantity,
          color: item.color,
        };
      }),
      orderByUser: id,
      userInformation,
      shippingAddress,
      paymentMethod,
      totalAmount,
    });

    await order.save();
    await Cart.deleteOne({ user: id });

    return res
      .status(200)
      .json({ message: "Order created successfully", order });
  } catch (error) {
    if (error.name === "ValidationError") {
      const firstError = Object.values(error.errors)[0];
      return res
        .status(400)
        .json({ message: firstError.message, failInfo: true });
    }
    return res.status(400).json({ message: error.message });
  }
};
const getOrderByUser = async (req, res) => {
  try {
    const { id } = req.user;
    let { page, limit, orderStatus } = req.query;
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;
    const skip = (page - 1) * limit;
    if (!id) {
      return res.status(404).json({ message: "User not found" });
    }
    // get order by orderStatus
    const query = { orderByUser: id };
    if (orderStatus) {
      query.orderStatus = orderStatus;
    }
    const orders = await Order.find(query)
      .select("products totalAmount paymentMethod orderStatus")
      .populate("products.product", "title price images")
      .limit(limit)
      .skip(skip);
    if (!orders) {
      return res.status(404).json({ message: "No orders found" });
    }
    return res.status(200).json({
      orders,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(
          (await Order.countDocuments({ orderByUser: id })) / limit
        ),
        totalOrders: await Order.countDocuments({ orderByUser: id }),
        pageSize: limit,
      },
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
const getOrderDetails = async (req, res) => {
  try {
    const { id } = req.user;
    const { orderId } = req.params;
    if (!id) {
      return res.status(404).json({ message: "User not found" });
    }
    const orderDetails = await Order.findById(orderId).populate(
      "products.product",
      "title price images"
    );
    if (!orderDetails) {
      return res.status(404).json({ message: "Order not found" });
    }
    return res.status(200).json({ orderDetails });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
const getAllOrdersAdmin = async (req, res) => {
  try {
    const { role_name } = req.user;
    if (role_name !== "admin") {
      return res
        .status(401)
        .json({ message: "You are not allowed to get all orders" });
    }
    let { page, limit, search } = req.query;
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;
    const skip = (page - 1) * limit;
    const orders = await Order.find()
      .limit(limit)
      .skip(skip)
      .populate("products.product", "title price images")
      .populate("orderByUser", "firstName lastName phoneNumber email");
    if (!orders) {
      return res.status(404).json({ message: "No orders found" });
    }
    return res.status(200).json({
      orders,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil((await Order.countDocuments()) / limit),
        pageSize: limit,
      },
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
const cancelOrder = async (req, res) => {
  try {
    const { id } = req.user;
    const { orderId } = req.body;
    if (!id) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!orderId) {
      return res.status(400).json({ message: "Please provide an order ID" });
    }
    const order = await Order.findByIdAndUpdate(
      orderId,
      { orderStatus: "Cancelled" },
      { new: true }
    );
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    return res.status(200).json({ message: "Order cancelled successfully" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
const updateStatusOrder = async (req, res) => {
  try {
    const { orderId, orderStatus } = req.body;

    const { role_name } = req.user;
    if (role_name !== "admin") {
      return res
        .status(401)
        .json({ message: "You are not allowed to update order status" });
    }
    if (!orderId) {
      return res.status(404).json({ message: "Order not found" });
    }
    if (!orderStatus) {
      return res
        .status(400)
        .json({ message: "Please provide an order status" });
    }
    await Order.findByIdAndUpdate(orderId, { orderStatus }, { new: true });
    return res
      .status(200)
      .json({ message: "Order status updated successfully", orderStatus });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getOrderByUser,
  createOrder,
  cancelOrder,
  getAllOrdersAdmin,
  updateStatusOrder,
  getOrderDetails,
};
