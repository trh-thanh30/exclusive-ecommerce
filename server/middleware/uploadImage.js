const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");

dotenv.config();

// Cấu hình Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Cấu hình Multer Storage để upload lên Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "exclusive_storage", // Thư mục trên Cloudinary
    format: async (req, file) => "png", // Định dạng ảnh
    public_id: (req, file) => file.originalname.split(".")[0] + "", // Tránh trùng file
  },
});

// Middleware Multer hỗ trợ upload nhiều ảnh
const cloudinaryFileUploader = multer({ storage: storage });
module.exports = cloudinaryFileUploader;
