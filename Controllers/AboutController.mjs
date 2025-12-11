import AboutModel from "../Models/AboutModel.mjs";

export const AboutInfo = async (req, res) => {
  try {
    const { amenities , coreValues } =  req.body;

  

    const information = await AboutModel.create({
      amenities,
      coreValues
    });
    res.status(201).json({
      message: "About content added",
      information,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getAllContent = async (req, res) => {
  try {
    const content = await AboutModel.find()
    if (content.length === 0) {
      return res.status(404).json({ message: "No info found" });
    } else {
      return res.status(200).json(content);
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};