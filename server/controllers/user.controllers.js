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
    const role = user.role_name;
    const isMatch = await bcryptjs.compareSync(password, user.password);
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
      .cookie("role", role, {
        httpOnly: true,
        expires: dateToken,
      })
      .status(200)
      .json({
        user: rest,
      });
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const { role_name } = req.user;
    if (role_name !== "admin") {
      return res
        .status(401)
        .json({ message: "Yot are not allowed to view!!!" });
    }
    let { page, limit, search } = req.query;
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;
    const skip = (page - 1) * limit;
    let query = {};
    if (search) {
      query = {
        $or: [
          { username: new RegExp(search, "i") },
          { email: new RegExp(search, "i") },
          { phone_number: new RegExp(search, "i") },
        ],
      };
    }
    if (role_name === "admin") {
      const user = await User.find(query).skip(skip).limit(limit);
      return res.status(200).json({
        message: "List of all users",
        data: {
          users: user,
          pagination: {
            currentPage: page,
            totalPages: Math.ceil((await User.countDocuments(query)) / limit),
            totalUsers: await User.countDocuments(query),
            pageSize: limit,
          },
        },
      });
    }
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
const getUserByID = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
const deleteUser = async (req, res) => {
  try {
    const { id } = req.user;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "User deleted successfully!!!" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
const deleteUserByAdmin = async (req, res) => {
  try {
    const { role_name } = req.user;
    if (role_name !== "admin") {
      return res
        .status(401)
        .json({ message: "Yot are not allowed to delete!!!" });
    }
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(401).json({ message: "User does not exist" });
    }
    return res.status(200).json({ message: "User deleted successfully!!!" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
const updateUser = async (req, res) => {
  const { id } = req.user;

  try {
    const userInfo = await User.findById(id);
    if (!userInfo) {
      return res.status(404).json({ message: "User not found" });
    }

    const {
      username,
      email,
      firstname,
      lastname,
      address,
      phone_number,
      oldpassword,
      newpassword,
      confirmPassword,
    } = req.body;

    // Kiểm tra mật khẩu mới và xác nhận mật khẩu mới
    if (newpassword && newpassword !== confirmPassword) {
      return res
        .status(400)
        .json({ message: "New password and confirm password do not match" });
    }

    // Kiểm tra nếu mật khẩu mới thì cần có mật khẩu cũ
    if (newpassword && !oldpassword) {
      return res
        .status(400)
        .json({ message: "Please provide your current password" });
    }

    let userUpdate = {
      username,
      email,
      firstname,
      lastname,
      address,
      phone_number,
    };

    // Nếu có mật khẩu mới, kiểm tra và thay đổi mật khẩu
    if (oldpassword && newpassword) {
      const isMatch = await bcryptjs.compare(oldpassword, userInfo.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Incorrect current password" });
      }

      // Băm mật khẩu mới và thêm vào userUpdate
      userUpdate.password = await bcryptjs.hash(newpassword, 10);

      // Xóa token khi user đổi mật khẩu
      res.clearCookie("access_token");
    }

    // Cập nhật avatar nếu có
    if (req.file) {
      userUpdate.avatar = req.file.path;
    }

    // Cập nhật người dùng
    const user = await User.findByIdAndUpdate(id, userUpdate, { new: true });
    return res.status(200).json({ user: user });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
const logout = async (req, res) => {
  try {
    res.clearCookie("access_token");
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const blockedUser = async (req, res) => {
  try {
    const { role_name } = req.user;
    if (role_name !== "admin") {
      return res
        .status(401)
        .json({ message: "You are not allowed to block users!!!" });
    }
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "User ID is required" });
    }
    const blockedUser = await User.findByIdAndUpdate(
      id,
      {
        $set: { is_blocked: true },
      },
      { new: true }
    );
    return res.status(200).json({ message: "User blocked successfully!!!" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const unblockedUser = async (req, res) => {
  try {
    const { role_name } = req.user;
    if (role_name !== "admin") {
      return res
        .status(401)
        .json({ message: "You are not allowed to unblock users!!!" });
    }
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "User ID is required" });
    }
    const unblockedUser = await User.findByIdAndUpdate(
      id,
      { $set: { is_blocked: false } },
      { new: true }
    );
    return res.status(200).json({ message: "User unblocked successfully!!!" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
const checkAuth = async (req, res) => {
  try {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json({ authenticated: false });
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.status(403).json({ authenticated: false });
      return res.status(200).json({ authenticated: true, user });
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
module.exports = {
  signin,
  signup,
  getUser,
  deleteUser,
  deleteUserByAdmin,
  updateUser,
  logout,
  getUserByID,
  blockedUser,
  unblockedUser,
  checkAuth,
};
