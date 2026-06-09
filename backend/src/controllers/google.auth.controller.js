import { OAuth2Client } from "google-auth-library";
import UserModel from "../models/User.js";
import jwt from "jsonwebtoken";

const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID
);

export const googleLogin = async (req, res) => {
  try {
    const { credential } = req.body;

    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    const { email, name, sub } = payload;

    let user = await UserModel.findOne({ email });

    if (!user) {
      user = await UserModel.create({
        name,
        email,
        googleId: sub,
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({
      token,
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};