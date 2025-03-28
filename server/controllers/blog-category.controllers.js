const blogCategory = require("../models/blog-category.models");

const createBlogCategory = async (req, res) => {
  try {
    const { category } = req.body;
    if (!category)
      return res.status(404).json({ message: "Please enter a category blog" });
    const hasCategory = await blogCategory.findOne({ category });
    if (hasCategory)
      return res.status(402).json({ message: "Category already exists" });
    const newCategory = new blogCategory({ category });
    await newCategory.save();
    return res.status(201).json({
      message: "Blog category created successfully",
      category: newCategory,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
const getAllBlogCategory = async (req, res) => {
  try {
    const categories = await blogCategory.find({});
    return res.status(200).json({ categories });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
const updateBlogCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { category } = req.body;
    const hasCategory = await blogCategory.findOne({ category });
    if (hasCategory) {
      return res.status(402).json({ message: "Category already exists" });
    }
    if (!id || !category)
      return res
        .status(404)
        .json({ message: "Please provide category id and new category" });
    const updatedCategory = await blogCategory.findByIdAndUpdate(
      id,
      { category },
      { new: true }
    );
    if (!updatedCategory)
      return res.status(404).json({ message: "Category not found" });
    return res.status(200).json({
      message: "Category updated successfully",
      category: updatedCategory,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
const deleteBlogCategory = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(404).json({ message: "Category ID not found" });
    const deletedCategory = await blogCategory.findByIdAndDelete(id);
    if (!deletedCategory)
      return res.status(404).json({ message: "Category not found" });
    return res.status(200).json({
      message: "Category deleted successfully",
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
module.exports = {
  createBlogCategory,
  getAllBlogCategory,
  updateBlogCategory,
  deleteBlogCategory,
};
