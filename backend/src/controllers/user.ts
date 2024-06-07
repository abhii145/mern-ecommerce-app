import { NextFunction, Request, Response } from "express";
import { User } from "../models/user";

export const newUser = async (
  req: Request,
  res: Response,
) => {
  if (!req.body) {
    return res.status(400).json({ error: "Request body is missing" });
  }

  const { _id, name, email, dob, photo, gender } = req.body;

  if (!_id || !name || !email || !dob || !photo || !gender) {
    return res.status(400).json({ error: "Please provide all fields" });
  }

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: "Email ID already taken" });
    }

    const user = await User.create({
      _id,
      name,
      email,
      dob,
      photo,
      gender,
    });

    console.log("User created successfully");
    return res.status(200).json({
      success: true,
      message: `Welcome ${user.age}`,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};
