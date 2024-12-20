const {
  validateSignupInput,
  validateSigninInput,
} = require("../middleware/validateInput");
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

    // Khi user đăng kí tài khoản sẽ có thư gửi email chúc mừng
    sendEmailService(email);

    return res.status(201).json({ message: "Sign up successfully" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

//@desc Post user
//@route POST /api/user/signin
//@access protected
const signin = async (req, res) => {
  try {
    const error = validateSigninInput(req.body);
    if (error) return res.status(400).json({ message: error });
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });
    const token = jwt.sign(
      { id: user._id, role_id: user.role_id, role_name: user.role_name },
      process.env.JWT_SECRET
    );
    const dateToken = new Date(Date.now() + 24 * 60 * 60 * 1000); // 1day from now
    const { password: privatePass, ...rest } = user._doc;
    return res
      .cookie("access_token", token, {
        httpOnly: true,
        expires: dateToken,
      })
      .status(200)
      .json({
        message: "Login successful",
        user: rest,
      });
  } catch (error) {
    return res.status(404).send({ message: error.message });
  }
};

module.exports = {
  signin,
  signup,
};
