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
const addressRouters = require("./routers/address.router");
const passport = require("passport");

const app = express();

app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://domain-cua-tao.com:3000"
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  })
);
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 60,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

// App routes
app.use("/api/role", roleRouters);
app.use("/api/user", userRouters);
app.use(gooleRouters);
app.use("/api/contact", contactRouters);
app.use("/api/category", categoryRouters);
app.use("/api/product", productRouters);
app.use("/api/blog-category", blogCategoryRouters);
app.use("/api/blog", blogRouters);
app.use("/api/brand", brandRouters);
app.use("/api/coupon", couponRouters);
app.use("/api/wishlists", wishlistsRouters);
app.use("/api/cart", cartRouters);
app.use("/api/order", orderRouters);
app.use("/api/address", addressRouters);
// MongoDB connect
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("MongoDB Error:", err.message);
  });
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
module.exports = app;
