const Coupon = require("../models/coupon.models");

const createCoupon = async (req, res) => {
  try {
    const { role_name } = req.user;
    if (role_name !== "admin")
      return res
        .status(403)
        .json({ message: "You are not allowed to create a coupon" });

    const { code, exp, discount } = req.body;
    if (!code || !exp || !discount)
      return res.status(404).json({ message: "Please fill all fields" });
    const hasCode = await Coupon.findOne({ code });
    if (hasCode)
      return res.status(401).json({ message: "Coupon allready exists" });
    const coupon = await Coupon.create({
      code,
      exp,
      discount,
    });
    return res
      .status(201)
      .json({ message: "Coupon created successfully", coupon });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
const getAllCoupons = async (req, res) => {
  try {
    const { role_name } = req.user;
    if (role_name !== "admin")
      return res
        .status(400)
        .json({ message: "You are not allowed to get all coupons" });
    const coupons = await Coupon.find();
    return res.status(200).json({ message: "All coupons", coupons });
  } catch (error) {
    return res.json({ message: error.message });
  }
};
const deleteCoupon = async (req, res) => {
  try {
    const { role_name } = req.user;
    if (role_name !== "admin")
      return res
        .status(403)
        .json({ message: "You are not allowed to delete a coupon" });
    const { id } = req.params;
    if (!id)
      return res.status(404).json({ message: "Coupon ID is not found!!!" });
    const coupon = await Coupon.findByIdAndDelete(id);
    if (!coupon) return res.status(404).json({ message: "Coupon not found" });
    return res
      .status(200)
      .json({ message: "Coupon deleted successfully", coupon });
  } catch (error) {
    return res.json({ message: error.message });
  }
};
const updateCoupon = async (req, res) => {
  try {
    const { role_name } = req.user;
    if (role_name !== "admin")
      return res
        .status(403)
        .json({ message: "You are not allowed to update a coupon" });
    const { id } = req.params;
    const coupon = await Coupon.findById(id);
    if (!coupon)
      return res
        .status(404)
        .json({ message: "Coupon not found. Please try agin!!!" });
    await Coupon.findByIdAndUpdate(id, req.body, { new: true });
    return res
      .status(200)
      .json({ message: "Coupon updated successfully", coupon });
  } catch (error) {
    return res.json({ message: error.message });
  }
};
module.exports = {
  createCoupon,
  getAllCoupons,
  deleteCoupon,
  updateCoupon,
};
