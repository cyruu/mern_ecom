import userModel from "../models/userModel.js";
import { encryptPassword } from "../helper/userHelper.js";

const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
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
      name,
      email,
      password: hashedPassword,
    });
    return res.status(201).send({ success: true, message: "New User created" });
  } catch (err) {
    console.log("register controller error ", err.message);
    return res.status(400).send({ success: false, message: err.message });
  }
};

export { registerController };
