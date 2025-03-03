import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
export const protectedRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({ msg: "Unauthorized - No Token Provided" });
    }
    const decoded=jwt.verify(token,"process.env.JWT_SECRET")
    if(!decoded){
      return res.status(401).json({ msg: "Unauthorized - Invalid Token" });

    }
    const user=await User.findById(decoded.userId).select('-password')
    if(!user){
      return res.status(400).json({ msg: "User not found" });
    }
    req.user=user
    next()

  } catch (error) {
    console.log("Error in protectedRoute middleware",error.message);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};
