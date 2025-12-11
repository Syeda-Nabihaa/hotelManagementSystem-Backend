import ContactModel from "../Models/ContactModel.mjs";

export const ContactInfo = async (req, res) => {
  try {
    const { title, description, value, icon } =  req.body;

    if (!title || !description|| !value || !icon) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const information = await ContactModel.create({
      title,
      description,
      value,
      icon,
    });
    res.status(201).json({
      message: "Information added",
      information,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllInfo = async (req, res) => {
  try {
    const info = await ContactModel.find();
    if (info.length === 0) {
      return res.status(404).json({ message: "No info found" });
    } else {
      return res.status(200).json(info);
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
export const getInfoById = async (req, res) => {
  try {
    const info = await ContactModel.findById(req.params.id);
    if (!info) return res.status(404).json({ message: "info not found" });
    res.status(200).json(info);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
export const updateInfo = async (req, res) => {
  try {
    const { id } = req.params;
    const updateinfo = await ContactModel.findOneAndUpdate(
      {
        _id: id,
      },
      req.body,
      { new: true }
    );

    if (!updateinfo) {
      return res.status(404).json({ message: "Info not found" });
    }
    res.status(200).json({ message: "Info Updated", updateinfo });
  } catch (error) {
    res.status(500).json(error.message);
  }
};
