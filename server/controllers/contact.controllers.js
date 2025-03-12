const Contact = require("../models/contact.models");
const User = require("../models/user.models");

const createContact = async (req, res) => {
  try {
    const { note, subject_name } = req.body;
    const userId = req.user.id;
  
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
const getAllContacts = async (req, res) => {
  try {
    const { role_name } = req.user;
    if (role_name !== "admin")
      return res
        .status(403)
        .json({ message: "You are not allowed to doing this!!!" });

    let { limit, page, search } = req.query;
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 5;
    const skip = (page - 1) * limit;
    let query = {};
    if (search) {
      query = {
        $or: [
          { subject_name: new RegExp(search, "i") },
          { username: new RegExp(search, "i") },
          { email: new RegExp(search, "i") },
          { note: new RegExp(search, "i") },
        ],
      };
    }
    const contacts = await Contact.find(query).skip(skip).limit(limit);
    return res.status(200).json({
      message: "List of all contacts",
      contacts,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil((await Contact.countDocuments(query)) / limit),
        totalContacts: await Contact.countDocuments(query),
        pageSize: limit,
      },
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
const getContact = async (req, res) => {
  try {
    const { role_name } = req.user;
    if (role_name !== "admin") {
      return res
        .status(403)
        .json({ message: "You are not allowed to doing this!!!" });
    }
    const { id } = req.params;
    const contact = await Contact.findById(id);
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    return res.status(200).json(contact);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
const deleteContact = async (req, res) => {
  try {
    const { role_name } = req.user;
    if (role_name !== "admin")
      return res
        .status(403)
        .json({ message: "You are not allowed to delete this contact" });
    const { id } = req.params;
    if (!id)
      return res.status(403).json({ messgae: "Contact ID not provided" });
    await Contact.findByIdAndDelete(id);
    return res.status(200).json({ message: "Delete contact successfully" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
const updateContact = async (req, res) => {
  try {
    const { role_name } = req.user;
    if (role_name !== "admin") {
      return res
        .status(403)
        .json({ message: "You are not allowed to update this contact" });
    }
    const { id } = req.params;
    const contact = await Contact.findById(id);
    if (!contact) return res.status(403).json({ messgae: "Contact not found" });
    if (!id)
      return res.status(403).json({ messgae: "Contact ID not provided" });
    const { note, status, subject_name } = req.body;
    const ALLOWED_STATUS = [
      "Not processed yet",
      "Processing",
      "Completed",
      "Rejected",
    ];
    if (status && !ALLOWED_STATUS.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }
    if (note) contact.note = note;
    if (status) contact.status = status;
    if (subject_name) contact.subject_name = subject_name;
    await contact.save();
    return res
      .status(200)
      .json({ message: "Contact updated successfully", contact });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
module.exports = {
  createContact,
  getAllContacts,
  getContact,
  deleteContact,
  updateContact,
};
