import ContactUsModel from "../Models/ContactUsModal.mjs";
export const createContactUs = async (req, res) => {
  try {
    const { email, name, subject, message } = req.body;

    if (!email || !name || !subject || !message) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const contactUs = await ContactUsModel.create({
      email,
      name,
      subject,
      message,
    });

    res.status(201).json({
      message: "Contact Us submitted successfully",
      data: contactUs,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

export const getAllContactUs = async (req, res) => {
  try {
    const contactUs = await ContactUsModel.find();

    if (!contactUs.length) {
      return res.status(404).json({
        message: "No Contact Us records found",
      });
    }

    res.status(200).json(contactUs);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};
