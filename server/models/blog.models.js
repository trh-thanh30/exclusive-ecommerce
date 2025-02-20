const mongoose = require("mongoose");
const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: [true, "Please enter blog title"],
    },
    description: {
      type: String,
      require: [true, "Please enter description"],
    },
    category: {
      type: String,
      require: [true, "Please enter category"],
    },
    numViews: {
      type: Number,
      default: 0,
    },
    isLiked: {
      type: Boolean,
      default: false,
    },
    isDisliked: {
      type: Boolean,
      default: false,
    },
    userLikes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    userDislikes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    images: [
      {
        type: String,
        default:
          "https://cloud.z.com/vn/wp-content/uploads/2023/11/how-to-write-a-blog-post.jpeg",
      },
    ],
    author: {
      type: String,
      default: "Admin",
    },
  },
  { toJson: { virtual: true }, toObject: { virtual: true }, timestamps: true }
);
const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;
