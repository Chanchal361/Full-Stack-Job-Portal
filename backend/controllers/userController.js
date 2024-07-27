import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import getDatauri from "../utils/datauri.js";
import cloudinary from "../utils/Cloudenary.js";
dotenv.config({});
export const register = async (req, res) => {
  try {
    const { fullname, email, password, role, phoneNumber, bio } = req.body;
    const file = req.file;
    // Check if required fields are present
    if (!fullname || !email || !password || !role || !phoneNumber) {
      return res.status(400).json({
        message: "All fields are required.",
        success: false,
      });
    }
    // upload img
    const fileUri = getDatauri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri);
    // Validate email format
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "Email already exists.",
        success: false,
      });
    }
    // Hash the password before saving it to the database
    const hashPassword = await bcrypt.hash(password, 10);
    // Create new user
    await User.create({
      fullname,
      email,
      password: hashPassword,
      role,
      phoneNumber,
      profile: {
        profilePhoto:cloudResponse.secure_url,
      },
    });
    res.status(201).json({
      message: "User registered successfully.",
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error occurred.", success: false });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    // Check if required fields are present
    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Email and password are required.",
        success: false,
      });
    }
    // Find user by email
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User not found.",
        success: false,
      });
    }
    // Check password match
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid email or password.",
        success: false,
      });
    }

    //   check usr or requiretor
    if (role !== user.role) {
      return res.status(403).json({
        message: "You are not authorized to access this resource.",
        success: false,
      });
    }
    //   Generate JWT token
    const tokenData = {
      userId: user._id,
    };
    const token = jwt.sign(tokenData, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      role: user.role,
      phoneNumber: user.phoneNumber,
      profile: user.profile,
    };
    // Set the token as a cookie on the response object, with expiration time of 1 day (86400 seconds)
    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
      })
      .json({
        message: "User logged in successfully.",
        success: true,
        user: user,
        token: token,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error occurred.", success: false });
  }
};

//  logOut
export const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logged out successfully",
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error occurred.", success: false });
  }
};

//  updatae profile

export const updateProfile = async (req, res) => {
  try {
    const { fullname, phoneNumber, bio, skills, email } = req.body;
    const file = req.file;
    // cloudenery setup
    const fileUri = getDatauri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri);

    let skillsArray;
    if (skills) {
      skillsArray = skills.split(",");
    }

    const userId = req.id; // it comes from the middleware

    // Find user by id
    let user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found.",
        success: false,
      });
    }

    //     update the data
    if (fullname) user.fullname = fullname;
    // user.fullname = fullname;
    // user.phoneNumber = phoneNumber;
    // user.skills = skillsArray;
    // user.email = email;
    // user.bio = bio;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (skills) user.profile.skills = skillsArray;
    if (email) user.email = email;
    if (bio) user.profile.bio = bio;

    // updata resume
    if (cloudResponse) {
      user.profile.resume = cloudResponse.secure_url;
      user.profile.resumeOriginalName = file.originalname; // to change the name in ui when any document will be updated
    }

    // save the updated user data to the database
    await user.save();

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      role: user.role,
      phoneNumber: user.phoneNumber,
      profile: user.profile,
    };

    return res.status(200).json({
      message: "Profile updated successfully.",
      success: true,
      user,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Server error occurred here.", success: false });
  }
};
