import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";  // Use bcryptjs instead of bcrypt
import validator from "validator";

const createToken = (id) => {
      return jwt.sign({ id }, process.env.JWT_SECRET);
};

const registerUser = async (req, res) => {
      const { name, email, password } = req.body;

      try {
            const exists = await userModel.findOne({ email });

            if (exists) {
                  return res.status(400).json({ success: false, message: "User Already Exists" });
            }

            if (!validator.isEmail(email)) {
                  return res.status(400).json({ success: false, message: "Please enter a valid email" });
            }

            if (password.length < 8) {
                  return res.status(400).json({ success: false, message: "Password must be at least 8 characters long" });
            }

            const salt = await bcrypt.genSalt(10); // bcryptjs uses this syntax as well
            const hashedPassword = await bcrypt.hash(password, salt);

            const newUser = new userModel({
                  name,
                  email,
                  password: hashedPassword,
            });

            const user = await newUser.save();

            const token = createToken(user._id);

            res.status(200).json({ success: true, token });

      } catch (error) {
            console.log(error);
            res.status(500).json({ success: false, message: "Error" });
      }
};

const loginUser = async (req, res) => {
      const { email, password } = req.body;

      try {
            const user = await userModel.findOne({ email });
            if (!user) {
                  return res.status(400).json({ success: false, message: "User does not exist" });
            }

            const isMatch = await bcrypt.compare(password, user.password);  // bcryptjs works similarly here

            if (!isMatch) {
                  return res.status(400).json({ success: false, message: "Invalid Email or password" });
            }

            const token = createToken(user._id);

            res.status(200).json({ success: true, token });

      } catch (error) {
            console.log(error);
            res.status(500).json({ success: false, message: "Error while logging in" });
      }
};

export { loginUser, registerUser };



