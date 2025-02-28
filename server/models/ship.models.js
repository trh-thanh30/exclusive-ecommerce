const mongoose = require("mongoose");
const shipSchema = new mongoose.Schema({});
const Ship = mongoose.model("Ship", shipSchema);
module.exports = Ship;
