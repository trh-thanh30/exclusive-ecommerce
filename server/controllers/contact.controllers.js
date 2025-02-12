const Contact = require("../models/contact.models");

const createContact = async (req, res) => {
  try {
    const { firstname, lastname, email, phone_number, subject_name, note } =
      req.body;
    if (
      !firstname ||
      !lastname ||
      !email ||
      !phone_number ||
      !subject_name ||
      !note
    ) {
      return res.status(400).json({ message: "Please fill all fields" });
    }
    const contact = new Contact({
      firstname,
      lastname,
      email,
      phone_number,
      subject_name,
      note,
    });
    await contact.save();
    return res.status(201).json({ message: "Contact created successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { createContact };
