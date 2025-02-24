const Product = require("../models/products.models");
const slugify = require("slugify");
const createProducts = async (req, res) => {
  try {
    const { role_name } = req.user;
    if (role_name !== "admin")
      return res
        .status(401)
        .json({ message: "You are not allowed to create a product" });
    const {
      title,
      description,
      slug,
      price,
      color,
      category,
      quantity,
      brand,
      sold,
      ratings,
      size,
    } = req.body;
    if (!title)
      return res.status(401).json({ message: "Please enter product title" });
    if (!description)
      return res
        .status(401)
        .json({ message: "Please enter product description " });
    if (!price)
      return res.status(401).json({ message: "Please enter product price" });
    if (!quantity)
      return res.status(401).json({ message: "Please enter product quantity" });
    if (!category)
      return res.status(401).json({ message: "Please enter product category" });
    if (!color)
      return res.status(401).json({ message: "Please enter product color" });
    if (!brand)
      return res
        .status(401)
        .json({ message: "Please enter product brand name" });
    const images = req.files.map((file) => file.path);
    const product = new Product({
      title,
      description,
      slug: slug || slugify(title),
      price,
      color,
      category,
      quantity,
      brand,
      sold,
      ratings,
      size,
      images,
      userId: req.user.id,
    });
    await product.save();
    return res
      .status(200)
      .json({ message: "Product created successfully", product });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
const getAllProducts = async (req, res) => {
  try {
    // Filetring
    const queryObject = { ...req.query };
    const excludeFields = ["page", "sort", "limit", "order"];
    excludeFields.forEach((field) => delete queryObject[field]);
    let queryString = JSON.stringify(queryObject);
    queryString = queryString.replace(
      /\b(gte|gt|lte|lt)\b/g,
      (match) => `$${match}`
    );
    let query = Product.find(JSON.parse(queryString));
    // Sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(",");
      query = query.sort(sortBy);
    } else {
      query = query.sort("-createdAt");
    }

    // Limiting the fields
    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      query = query.select(fields);
    } else {
      query = query.select("-__v");
    }
    // Pagination
    let { limit, page } = req.query;
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;
    const skip = (page - 1) * limit;
    const products = await query.skip(skip).limit(limit);
    const totalProducts = await Product.countDocuments(query._conditions);
    return res.status(200).json({
      products,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalProducts / limit),
        totalProducts,
        pageSize: limit,
      },
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(404).json({ message: "Product ID not found" });
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.status(200).json({ product });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { role_name } = req.user;
    if (role_name !== "admin") {
      return res
        .status(401)
        .json({ message: "You are not allowed to update the product" });
    }
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const updateProduct = await Product.findByIdAndUpdate(
      id,
      { $set: req.body },
      {
        new: true,
      }
    );
    return res.status(200).json({
      message: "Product updated successfully",
      updateProduct,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { role_name } = req.user;
    if (role_name !== "admin")
      return res
        .status(402)
        .json({ message: "You are not allowed to delete the product" });
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    await Product.findByIdAndDelete(id);
    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
module.exports = {
  createProducts,
  getAllProducts,
  getProduct,
  updateProduct,
  deleteProduct,
};
