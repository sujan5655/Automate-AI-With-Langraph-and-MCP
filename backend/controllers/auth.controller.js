import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { verifyFirebaseIdToken } from "../utils/verifyFirebaseToken.js";

export const login = async (req, res) => {
  try {
    const { token: firebaseToken } = req.body;
    if (!firebaseToken) {
      return res.status(400).json({ message: "token not found" });
    }
    const decoded = await verifyFirebaseIdToken(firebaseToken);
    const user = await User.findOneAndUpdate(
      {
        firebaseUid: decoded.uid,
      },
      {
        $set: {
          name: decoded.name,
          email: decoded.email,
          profilePicture: decoded.picture,
        },
        $setOnInsert: {
          firebaseUid: decoded.uid,
        },
      },
      {
        upsert: true,
        returnDocument: "after",
      },
    );
    const token = await jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: "true",
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: `Login Error ${error}` });
  }
};

export const logout = async () => {
  try {
    res.clearCookie("token", {
      httpOnly: "true",
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({ message: "Logout Successfully" });
  } catch (error) {
    return res.status(500).json({ message: `Logout Error ${error}` });
  }
};

export const me = async (req, res) => {
  try {
    const user = req.user;
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: `Me Error ${error}` });
  }
};
