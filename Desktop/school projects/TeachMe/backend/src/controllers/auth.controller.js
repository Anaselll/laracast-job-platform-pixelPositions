import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import Bcrypt from "bcrypt";

export const signup = async (req, res) => {
  console.log(req.body);
  const { fullName, email, password } = req.body;
  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }
    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "Email already exists" });
    const newUser = await new User({
      fullName,
      email,
      password,
    });
 

    if (newUser) {
      generateToken(newUser._id, res);
      await newUser.save();
      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        createdAt: newUser.createdAt,
      });
    } else {
      return res.status(400).json({ message: "invalid user data" });
    }
  } catch (error) {
    console.log("error in signup controller", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    console.log(1)
    console.log(user.password)
    console.log(password);
    const isPasswordCorrect = await Bcrypt.compare(password, user.password);
    console.log(isPasswordCorrect)
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    console.log(12)
    generateToken(user._id, res);
    console.log(user)
    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      createdAt: user.createdAt,
    });
  } catch (error) {
    console.log("error in login controller", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};
export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", {
      maxAge: 0,
    });
    res.status(200).json({ message: "logged out successfully" });
  } catch (error) {
    console.log("error in logout controller", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const  checkAuth=(req,res)=>{
    try{
        res.status(200).json(req.user)
    }
    catch(error){
        console.log("error in check auth controller",error.message)
        return res.status(500).json({message:"Internal server error"})
    }
}
