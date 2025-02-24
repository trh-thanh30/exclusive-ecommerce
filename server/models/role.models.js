const mongoose = require("mongoose");
const roleSchema = new mongoose.Schema(
  {
    role_name: {
      type: String,
      default: "user",
    },
    role_userId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    role_adminId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Role = mongoose.model("Role", roleSchema);

module.exports = Role;
