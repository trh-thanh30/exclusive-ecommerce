const Role = require("../models/role.models");

const createRole = async (req, res) => {
  const { role_name } = req.body;
  try {
    const role = await Role.create({ role_name });
    return res.status(201).json(role);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports = createRole;
