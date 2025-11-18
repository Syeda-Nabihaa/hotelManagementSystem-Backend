import UserModel from "../Models/UserModel.mjs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signUp = async (req, res) => {
  try {
    const { name, email, password, role, position } = req.body;
    const existingUser = await UserModel.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ message: "User Allready exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const registerUser = await UserModel.create({
      name: name,
      email: email,
      password: hashedPassword,
      role,
      position,
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

// import jwt from "jsonwebtoken";
// import UserModel from "../model/UserModel.mjs";
// import bcrypt from 'bcrypt'
// // import validations from "../validation/validation.mjs";

// const login = async (req, res) => {

//     const { email, password } = req.body;
//     try {
//         const existingUser = await UserModel.findOne({ email: email });
//         if (!existingUser) {
//             return res.status(404).json({ message: "User not found" });
//         }

//         const comparePassword = await bcrypt.compare(
//             password, existingUser.password
//         )
//         if (!comparePassword) {
//             return res.status(400).json({ message: "Invalid Credentials" });

//         }
//         const token = jwt.sign(
//             { id: existingUser._id },
//             process.env.JWT_SECRET
//         );

//         return res.status(200).json({ existingUser, token });

//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({ message: "Internal Server Error", error });
//     }

// }

// const UserController = {
//     signup,
//     login

// }

// export default UserController
