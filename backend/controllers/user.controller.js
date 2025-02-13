import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";
import dotenv from "dotenv";

dotenv.config();

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        message: "Please fill all the required fields",
        success: false,
      });
    }

    // Check if user exists
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "No account found with this email. Please sign up.",
        success: false,
      });
    }

    // Check password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Incorrect email or password",
        success: false,
      });
    }

    // Generate token for login
    const tokenData = { userId: user._id };
    const token = jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: true,
        sameSite: "Lax",
      })
      .json({
        message: `Welcome back ${user.fullname}`,
        user: {
          _id: user._id,
          fullname: user.fullname,
          email: user.email,
          phoneNumber: user.phoneNumber,
          role: user.role,
          profile: user.profile,
        },
        success: true,
      });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "An error occurred",
      success: false,
    });
  }
};

export const signup = async (req, res) => {
  try {
    const { fullname, email, password, role, phoneNumber } = req.body;

    if (!fullname || !email || !password || !role || !phoneNumber) {
      return res.status(400).json({
        message: "Please provide all required fields",
        success: false,
      });
    }
    if (role === "admin" && req.body.adminSecret !== process.env.ADMIN_SECRET) {
      return res.status(403).json({
        message: "Unauthorized to create an admin account",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
    });

    const token = jwt.sign(
      { userId: newUser._id, role: newUser.role },
      process.env.SECRET_KEY,
      {
        expiresIn: "1d",
      }
    );

    return res
      .status(201)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: true,
        sameSite: "Lax",
      })
      .json({
        message: "Account created successfully",
        user: {
          _id: newUser._id,
          fullname: newUser.fullname,
          email: newUser.email,
          phoneNumber: newUser.phoneNumber,
          role: newUser.role,
        },
        success: true,
      });
  } catch (error) {
    console.error("Error during signup:", error);
    return res.status(500).json({
      message: "An error occurred",
      success: false,
    });
  }
};

export const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logout successful",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, bio, skills } = req.body;
    const userId = req.id;

    let user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    let skillsArray;
    if (skills) {
      skillsArray = skills.split(",");
    }

    // Upload files to Cloudinary
    let profilePhotoUrl = user.profile.profilePhoto;
    let resumeUrl = user.profile.resume;
    let resumeOriginalName = user.profile.resumeOriginalName;

    if (req.files?.profilePhoto) {
      const profilePhotoUri = getDataUri(req.files.profilePhoto[0]);
      const cloudResponse = await cloudinary.uploader.upload(
        profilePhotoUri.content
      );
      profilePhotoUrl = cloudResponse.secure_url;
    }

    if (req.files?.resume) {
      const resumeUri = getDataUri(req.files.resume[0]);
      const cloudResponse = await cloudinary.uploader.upload(resumeUri.content);
      resumeUrl = cloudResponse.secure_url;
      resumeOriginalName = req.files.resume[0].originalname;
    }

    // Update user data
    user.fullname = fullname || user.fullname;
    user.email = email || user.email;
    user.phoneNumber = phoneNumber || user.phoneNumber;
    if (bio) user.profile.bio = bio;
    if (skillsArray) user.profile.skills = skillsArray;
    user.profile.profilePhoto = profilePhotoUrl;
    user.profile.resume = resumeUrl;
    user.profile.resumeOriginalName = resumeOriginalName;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role,
        profile: user.profile,
      },
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
