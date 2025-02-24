const Brand = require("../models/brand.models");

const createBrand = async (req, res) => {
  try {
    const { role_name } = req.user;
    if (role_name !== "admin")
      return res
        .status(402)
        .json({ message: "You are not allowed to create a brand" });
    const { title } = req.body;
    if (!title) return res.status(400).json({ message: "Title is required" });
    const hasTitle = await Brand.findOne({ title });
    if (hasTitle)
      return res.status(200).json({ message: "Brand already exists" });
    const brand = await Brand.create({ title });
    return res
      .status(201)
      .json({ message: "Brand created successfully", brand: brand });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
const getAllBrand = async (req, res) => {
  try {
    let { page, limit, search } = req.query;
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 5;
    const skip = (page - 1) * limit;
    let query = {};
    if (search) {
      query = {
        $or: [{ title: new RegExp(search, "i") }],
      };
    }
    const brands = await Brand.find(query).limit(limit).skip(skip);
    return res.status(200).json({
      message: "List of all brands",
      brands,
      pagination: {
        currentPage: page,
        totalPage: Math.ceil((await Brand.countDocuments(query)) / limit),
        totalBrands: await Brand.countDocuments(query),
        pageSize: limit,
      },
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
const getBrand = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(404).json({ message: "Brand ID not found" });
    const brand = await Brand.findById(id);
    if (!brand) return res.status(404).json({ message: "Brand not found" });
    return res.status(200).json({ brand });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
const deleteBrand = async (req, res) => {
  try {
    const { role_name } = req.user;
    if (role_name !== "admin")
      return res
        .status(402)
        .json({ message: "You are not allowed to delete a brand" });
    const { id } = req.params;
    const brand = await Brand.findById(id);
    if (!brand)
      return res
        .status(404)
        .json({ message: "Brand not found. Please try again." });
    await Brand.findByIdAndDelete(id);
    return res.status(200).json({ message: "Brand deleted successfully" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
const updateBrand = async (req, res) => {
  try {
    const { role_name } = req.user;
    if (role_name !== "admin")
      return res
        .status(402)
        .json({ message: "You are not allowed to update a brand" });
    const { title } = req.body;
    if (!title) return res.status(400).json({ message: "Title is required" });
    const { id } = req.params;
    if (!id)
      return res
        .status(404)
        .json({ message: "Brand ID not found. Please try agin" });
    const brand = await Brand.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!brand) {
      return res
        .status(404)
        .json({ message: "Brand not found. Please try again." });
    }
    return res
      .status(200)
      .json({ message: "Brand updated successfully", brand });
  } catch {
    return res.status(400).json({ message: error.message });
  }
};
module.exports = {
  createBrand,
  deleteBrand,
  updateBrand,
  getBrand,
  getAllBrand,
};
