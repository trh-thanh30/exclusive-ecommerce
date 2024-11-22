const mongoose = require("mongoose");
const roleSchema = new mongoose.Schema(
  {
    role_name: {
      type: String,
      default: "user"
    },
  },
  {
    timestamps: true,
  }
);

const Role = mongoose.model("Role", roleSchema);

module.exports = Role;
