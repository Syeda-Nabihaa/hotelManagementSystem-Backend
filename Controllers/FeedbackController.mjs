import BookingModel from "../Models/BookingModel.mjs";
import FeedbackModel from "../Models/FeedbackModel.mjs";

export const createFeedback = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    if (!rating || !comment) {
      return res.status(400).json({ message: "Rating and comment required" });
    }

    // const booking = await BookingModel.findOne({
    //   guest: req.user.id,
    //   status: "checked-out", // only after checkout
    // });
    // if(!booking){
    //      return res.status(403).json({ message: "You can only submit feedback after your stay" });
    // }
    const feedback = FeedbackModel.create({
      guest: req.user.id,
      rating,
      comment,
    });
    res.status(201).json({
      message: "Feedback submitted successfully",
      feedback,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllFeedback = async (req, res) => {
  try {
    const feedback = await FeedbackModel.find();
    if (feedback.length === 0) {
      return res.status(404).json({ message: "No feedback found" });
    } else {
      return res.status(200).json(feedback);
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


export const deleteFeedback = async (req, res) => {
  try {
    const deleteFeedback = await FeedbackModel.findByIdAndDelete(req.params.id);
    if (!deleteFeedback)
      return res.status(404).json({ message: "Feedback not found" });
    res.status(200).json({ message: "Feedback deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
