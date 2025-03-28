const { default: slugify } = require("slugify");
const Blog = require("../models/blog.models");

const createBlog = async (req, res) => {
  const { role_name } = req.user;
  const { title, description, category, slug } = req.body;
  if (role_name !== "admin")
    return res
      .status(401)
      .json({ message: "You are not allowed to create bolg" });
  if (!title || !description || !category)
    return res.status(403).json({ message: "Please enter all fills" });
  const hasBlog = await Blog.findOne({ title });
  if (hasBlog)
    return res
      .status(403)
      .json({ message: "Blog already exists. Please try again!!" });
  try {
    const images = req.files.map((file) => file.path);
    const blog = new Blog({
      title,
      description,
      category,
      images,
      slug: slug || slugify(title),
    });
    await blog.save();
    return res
      .status(201)
      .json({ message: "Blog created successfully", blog: blog });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const updateBlog = async (req, res) => {
  const { id } = req.params;
  const { role_name } = req.user;

  if (role_name !== "admin")
    return res
      .status(403)
      .json({ message: "You are not allowed to update bolg" });
  if (!id) return res.status(404).json({ message: "Blog ID not found!" });
  try {
    const blog = await Blog.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    return res.status(200).json({ message: "Blog updated successfully", blog });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
const getAllBlogs = async (req, res) => {
  try {
    let { page, limit, search, category } = req.query;
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 5;
    const skip = (page - 1) * limit;
    let query = {};
    if (search) {
      query = {
        $or: [
          { title: { $regex: search, $options: "i" } },
          { description: { $regex: search, $options: "i" } },
          { category: { $regex: search, $options: "i" } },
        ],
      };
    }
    if (category) {
      query.category = category;
    }
    const blogs = await Blog.find(query).skip(skip).limit(limit);
    let totalNumViews = 0;
    for (let i = 0; i < blogs.length; i++) {
      totalNumViews += blogs[i].numViews;
    }
    return res.status(200).json({
      message: "Blogs retrieved successfully",
      blogs,
      totalNumViews,
      pagination: {
        currentPage: page,
        totalPage: Math.ceil((await Blog.countDocuments(query)) / limit),
        totalBlogs: await Blog.countDocuments(query),
        pageSize: limit,
      },
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
const getBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id)
      .populate("userLikes")
      .populate("userDislikes");
    await Blog.findByIdAndUpdate(id, { $inc: { numViews: 1 } }, { new: true });
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    return res
      .status(200)
      .json({ message: "Blog retrieved successfully", blog });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
const deleteBlog = async (req, res) => {
  const { role_name } = req.user;
  if (role_name !== "admin") {
    return res
      .status(403)
      .json({ message: "You are not allowed to delete this blog" });
  }
  const { id } = req.params;
  try {
    const blog = await Blog.findByIdAndDelete(id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    return res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
const likeBlog = async (req, res) => {
  const { blogId } = req.body;
  if (!blogId)
    return res
      .status(400)
      .json({ message: "Blog ID not found. Plesae try agin!" });
  const blog = await Blog.findById(blogId);
  const loginUserId = req?.user?.id;
  const isLiked = blog?.isLiked;
  const alreadyDisliked = blog?.userDislikes?.find(
    (userId) => userId.toString() === loginUserId.toString()
  );
  if (alreadyDisliked) {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $pull: { userDislikes: loginUserId },
        isDisliked: false,
      },
      { new: true }
    );
    return res.status(200).json(blog);
  }
  if (isLiked) {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $pull: { userLikes: loginUserId },
        isLiked: false,
      },
      { new: true }
    );
    return res.status(200).json(blog);
  } else {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $push: { userLikes: loginUserId },
        isLiked: true,
      },
      { new: true }
    );
    return res.status(200).json(blog);
  }
};
const dislikeBlog = async (req, res) => {
  const { blogId } = req.body;
  if (!blogId)
    return res.status(404).json({ message: "Blog ID not found. Try agin!" });
  const blog = await Blog.findById(blogId);
  const loginUserId = req?.user?.id;
  const isDisliked = blog?.isDisliked;
  const alreadyLiked = blog?.userLikes?.find(
    (userId) => userId.toString() === loginUserId.toString()
  );
  if (alreadyLiked) {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $pull: { userLikes: loginUserId },
        isLiked: false,
      },
      {
        new: true,
      }
    );
    return res.status(200).json(blog);
  }
  if (isDisliked) {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $pull: { userDislikes: loginUserId },
        isDisliked: false,
      },
      { new: true }
    );
    return res.status(200).json(blog);
  } else {
    const blog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $push: { userDislikes: loginUserId },
        isDisliked: true,
      },
      { new: true }
    );
    return res.status(200).json(blog);
  }
};
module.exports = {
  createBlog,
  updateBlog,
  getAllBlogs,
  getBlog,
  deleteBlog,
  likeBlog,
  dislikeBlog,
};
