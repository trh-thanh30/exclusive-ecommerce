const { validateSignupInput } = require("../middleware/validateInput");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const User = require("../models/user.models");
const Role = require("../models/role.models");
const sendEmailService = require("../services/sendEmail");

//@desc Post user
//@route POST /api/user/signup
//@access protected
const signup = async (req, res) => {
  try {
    const error = validateSignupInput(req.body);
    if (error) return res.status(400).json({ message: error });

    const { username, email, password, role_id, role_name } = req.body;

    // Nếu không có `role_id` thì gán giá trị mặc định là role của user
    const defaultRole = await Role.findOne({ role_name: "user" });
    const assignedRole = role_id || defaultRole._id; // error ?
    const assignedRoleName = defaultRole.role_name;

    // Kiểm tra xem email đã tồn tại chưa
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    // Mã hóa mật khẩu
    const hashedPassword = bcryptjs.hashSync(password, 10);

    // Đăng ký user mới
    await User.create({
      email: email,
      password: hashedPassword,
      username,
      role_id: assignedRole,
      role_name: assignedRoleName,
    });

    // Khi user dang khi tai khoan thanh cong se co email chuc mung
    sendEmailService(email);

    return res.status(201).json({ message: "Sign up successfully" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

//@desc Post user
//@route POST /api/user/signin
//@access protected
const signin = async (req, res) => {};

module.exports = {
  signin,
  signup,
};
