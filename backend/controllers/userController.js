import userModel from "../models/userModel.js";
import { encryptPassword, comparePassword } from "../helper/userHelper.js";
import jwt from "jsonwebtoken";

const registerController = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res
        .status(400)
        .send({ success: false, message: "Credentials required" });
    }
    //check for user exists
    const userExists = await userModel.findOne({ email });
    if (userExists) {
      return res
        .status(400)
        .send({ success: false, message: "User already exists" });
    }
    //encrypted password
    const hashedPassword = await encryptPassword(password);
    //create a user
    const newUser = await userModel.create({
      username,
      email,
      password: hashedPassword,
    });
    return res.status(201).send({ success: true, message: "New User created" });
  } catch (err) {
    console.log("register controller error ", err.message);
    return res.status(400).send({ success: false, message: err.message });
  }
};

// loginController
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("email before response", req.body);
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).send({ success: false, message: "No user found" });
    }
    // check if password match
    const passMatch = await comparePassword(password, user.password);
    if (!passMatch) {
      return res
        .status(400)
        .send({ success: false, message: "Incorrect password" });
    }
    // set a jwt token
    const tokenData = {
      email: user.email,
      id: user._id,
      username: user.username,
    };
    const token = jwt.sign(tokenData, "ecomkey", { expiresIn: "10h" });
    res.cookie("token", token, { httpOnly: true });
    return res
      .status(200)
      .send({ success: true, message: "userfound", token, user });
  } catch (error) {
    return res.status(400).send({ success: false, message: error.message });
  }
};

export { registerController, loginController };
