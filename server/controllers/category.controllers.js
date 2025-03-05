const Category = require("../models/category.models");

const createCategory = async (req, res) => {
  try {
    const { role_name } = req.user;
    if (role_name !== "admin") {
      return res
        .status(401)
        .json({ message: "You are not allowed to create a category!!!" });
    }
    const { title } = req.body;
    if (!title || title.trim() === "") {
      return res
        .status(400)
        .json({ message: "Title is required and cannot be empty" });
    }
    const hasTitle = await Category.findOne({ title });
    if (hasTitle)
      return res.status(400).json({ message: "Title already exists" });
    const newCategory = new Category({ title });
    await newCategory.save();
    return res
      .status(201)
      .json({ message: "Category created successfully!!!" });
  } catch (error) {
    console.log(error)
    return res.status(400).json({ message: error.message });
  }
};
const updateCategory = async (req, res) => {
  try {
    const { role_name } = req.user;
    if (role_name !== "admin")
      return res
        .status(401)
        .json({ message: "You are not allowed to updated a category!!!" });
    const { id } = req.params;
    if (!id)
      return res.status(404).josn({ message: "Category ID is not found!!!" });
    const updateCategory = await Category.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    return res
      .status(200)
      .json({ message: "Update category successfully!!!" }, updateCategory);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
const deleteCategory = async (req, res) => {
  try {
    const { role_name } = req.user;

    if (role_name !== "admin")
      return res
        .status(401)
        .json({ message: "You are not allowed to delete this category!!!" });
    const { id } = req.params;
    if (!id)
      return res.status(404).josn({ message: "Category ID is not found!!!" });
    await Category.findByIdAndDelete(id);
    return res
      .status(200)
      .json({ message: "Category deleted successfully!!!" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
const getCategory = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id)
      return res.status(404).json({ message: "Category ID is not found!!!" });
    const category = await Category.findById(id);
    return res.status(200).json({ category });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
const getAllCategory = async (req, res) => {
  try {
    const categories = await Category.find();
    return res.status(200).json(categories);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
module.exports = {
  createCategory,
  updateCategory,
  deleteCategory,
  getAllCategory,
  getCategory,
};
