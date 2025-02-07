import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

const isAuthorized = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        message: "Unauthorised user",
        success: false,
      });
    }
    const decode = jwt.verify(token, process.env.SECRET_KEY);
    if (!decode) {
      return res.status(401).json({
        message: "Invalid token",
        success: false,
      });
    }
    req.id = decode.userId;
    const user = await User.findById(decode.userId);
    if (!user) {
      return res.status(400).json({
        message: "user not found.",
        success: "false",
      });
    }
    if (user.role != "recruiter") {
      return res.status(403).json({
        message: "Forbidden route",
        success: "false",
      });
    }

    next();
  } catch (error) {
    console.log(error);
  }
};
export default isAuthorized;
