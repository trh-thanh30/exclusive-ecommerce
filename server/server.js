require("dotenv").config();
require("./services/passport");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

const roleRouters = require("./routers/role.router");
const userRouters = require("./routers/user.router");
const gooleRouters = require("./routers/google.router");
const contactRouters = require("./routers/contact.router");
const passport = require("passport");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(
  session({
    secret: process.env.SESSION_SECRET, // Khóa bí mật để mã hóa session
    resave: false, // Không lưu session nếu không có thay đổi
    saveUninitialized: false, // Không lưu session chưa khởi tạo
    cookie: {
      secure: false, // Đặt thành true nếu dùng HTTPS
      maxAge: 1000 * 60 * 60, // Thời gian sống của cookie (1 giờ)
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());
// App routes
/**  ROLE ROUTER **/
app.use("/api/role", roleRouters);
/**  USER ROUTER  **/
app.use("/api/user", userRouters);
/**  GOOGLE ROUTER  **/
app.use(gooleRouters); // GET -> auth/google
/** CONTACT ROUTER */
app.use("/api/contact", contactRouters);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err.message);
  });

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
