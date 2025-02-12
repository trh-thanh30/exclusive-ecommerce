const Category = require("../models/category.models");

const createCategory = () => {
  try {
    const { role } = req.user;
    console.log(role);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
module.exports = { createCategory };
