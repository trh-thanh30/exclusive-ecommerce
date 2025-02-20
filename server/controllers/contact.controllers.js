const Contact = require("../models/contact.models");
const User = require("../models/user.models");

const createContact = async (req, res) => {
  try {
    const { note, subject_name } = req.body;
    const userId = req.user.id;
    console.log(userId);
    if (!subject_name || !note) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const userInfo = await User.findById(userId).select("-password");

    if (!userInfo) {
      return res.status(404).json({ message: "User not found" });
    }
    const contact = new Contact({
      userInformations: userInfo,
      subject_name,
      note,
    });
    await contact.save();
    return res
      .status(201)
      .json({ message: "Contact created successfully", contact });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
const getAllContacts = async (req, res) => {};
const getContact = async (req, res) => {};
module.exports = { createContact, getAllContacts, getContact };
