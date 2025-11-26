import UserModel from "../Models/UserModel.mjs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signUp = async (req, res) => {
  try {
    const { name, email, password, number, role, position, city } = req.body;
    const existingUser = await UserModel.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ message: "User Allready exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const registerUser = await UserModel.create({
      name: name,
      email: email,
      password: hashedPassword,
      role: role,
      position,
      number,
      city,
    });
    return res.status(200).json({ registerUser });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await UserModel.findOne({ email: email });
    if (!existingUser) {
      res.status(404).json({ message: "No user found" });
    }
    const comparePassword = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!comparePassword) {
      res.status(400).json({ message: "Invalid Credentials" });
    }
    const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET);

    return res.status(200).json({ existingUser, token });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export const getAllUser = async (req, res) => {
  try {
    const users = await UserModel.find();
    res.status(200).json(users);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export const getProfile = async (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserbyid = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await UserModel.findById(id);
    if (!user) {
      return res.status(404).json({ message: "no user found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const userId = req.user.id; 
    const { name, password, number, position, city } = req.body;

    // Fetch full Mongoose document
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "no user found" });
    }

    if (name) user.name = name;
    if (number) user.number = number;
    if (position) user.position = position;
    if (city) user.city = city;

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

const updatedUser = await user.save({ validateBeforeSave: false });

    return res.status(200).json({
      message: "User updated successfully",
      updatedUser,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

