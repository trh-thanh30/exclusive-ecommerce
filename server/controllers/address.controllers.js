const Address = require("../models/address.models");

const createAddress = async (req, res) => {
  try {
    const { id } = req.user;
    const { province, district, commune, detailAddress, isDefault } = req.body;

    if (!province || !district || !commune || !detailAddress) {
      return res
        .status(400)
        .json({ message: "Please provide all address info" });
    }
    if (isDefault) {
      await Address.updateMany({ userId: id }, { $set: { isDefault: false } });
    }
    const address = await Address.create({
      userId: id,
      province,
      district,
      commune,
      detailAddress,
      isDefault,
    });

    return res
      .status(200)
      .json({ message: "Address created successfully", address });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
const getAllAddress = async (req, res) => {
  try {
    const { id } = req.user;
    const address = await Address.find({ userId: id });
    let indexIsDefault = 0;
    let temp = [];
    for (let i = 0; i < address.length; i++) {
      if (address[i].isDefault === true) {
        indexIsDefault = i;
        temp = address[indexIsDefault];
        address[indexIsDefault] = address[0];
        address[0] = temp;
        break;
      }
    }
    return res.status(200).json({ address });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
const editAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const { province, district, commune, detailAddress, isDefault } = req.body;

    if (!province || !district || !commune || !detailAddress) {
      return res
        .status(400)
        .json({ message: "Please provide all address info" });
    }

    if (isDefault) {
      await Address.updateMany({ userId: id }, { $set: { isDefault: false } });
    }

    await Address.findByIdAndUpdate(
      id,
      {
        $set: {
          province,
          district,
          commune,
          detailAddress,
          isDefault,
        },
      },
      { new: true }
    );

    return res.status(200).json({ message: "Address updated successfully" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
const getDetailAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const address = await Address.findById(id);
    return res.status(200).json({ address });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
const deleteAddress = async (req, res) => {
  try {
    const { id } = req.params;
    await Address.findByIdAndDelete(id);
    return res.status(200).json({ message: "Address deleted successfully" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
const getAddressIsDefault = async (req, res) => {
  try {
    const { id } = req.user;
    const address = await Address.findOne({ userId: id, isDefault: true });
    return res.status(200).json({ address });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
module.exports = {
  createAddress,
  getAllAddress,
  editAddress,
  getDetailAddress,
  deleteAddress,
  getAddressIsDefault,
};
