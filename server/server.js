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
const categoryRouters = require("./routers/category.router");
const productRouters = require("./routers/products.router");
const blogCategoryRouters = require("./routers/blog-category.router");
const blogRouters = require("./routers/blog.router");
const brandRouters = require("./routers/brand.router");
const couponRouters = require("./routers/coupon.router");
const wishlistsRouters = require("./routers/wishlists.router");
const cartRouters = require("./routers/cart.router");
const orderRouters = require("./routers/order.router");

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
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
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

/* CATEGORY ROUTER */
app.use("/api/category", categoryRouters);

/* PRODUCTS ROUTER */
app.use("/api/product", productRouters);

/* BLOG-CATEGORIES ROUTER */
app.use("/api/blog-category", blogCategoryRouters);

/* BLOG ROUTER */
app.use("/api/blog", blogRouters);

/* BRAND ROUTER */
app.use("/api/brand", brandRouters);

/* COUPON ROUTER */
app.use("/api/coupon", couponRouters);

/* WISHLISTS ROUTER */
app.use("/api/wishlists", wishlistsRouters);

/* CART ROUTER */
app.use("/api/cart", cartRouters);
/* ORDER ROUTER */
app.use("/api/order", orderRouters);


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
