import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import UserModel from "../models/User.js";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;
// console.log(JWT_SECRET)

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  const existingUser = await UserModel.findOne({ email: email });
  if (existingUser) {
    return res.status(400).json({
      message: "User with this email already exists",
    });
  }
  const salt = 12;
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    const User = await new UserModel({
      name: name,
      email: email,
      password: hashedPassword,
    });
    await User.save();

    const token = jwt.sign(
      {
        id: User._id,
        email: User.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

    res.status(201).json({
      message: "User registered successfully",
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
console.log(process.env.JWT_SECRET);

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);

    // const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "user not found",
      });
    }
    if (!user.password) {
      return res.status(400).json({
        message:
          "This account was created using Google. Please sign in with Google.",
      });
    }

    console.log(user);
    console.log(user?.password);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "password is wrong",
      });
    }

    console.log("JWT_SECRET =", process.env.JWT_SECRET);

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );
    res.status(200).json({
      message: "login successfull",
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// export const logoutUser = (req, res) => {
//   res.status(200).json({
//     success: true,
//     message: "Logged out successfully",
//   });
// };
