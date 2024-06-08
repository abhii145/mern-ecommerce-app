import { NextFunction, Request, Response } from "express";
import { User } from "../models/user";

export const newUser = async (req: Request, res: Response) => {
  if (!req.body) {
    return res.status(400).json({ error: "Request body is missing" });
  }

  const { _id, name, email, dob, photo, gender } = req.body;

  const existingUser = await User.findById(_id);

  if (existingUser)
    return res.status(200).json({
      success: true,
      message: `Welcome, ${existingUser?.name}`,
    });

  if (!_id || !name || !email || !dob || !photo || !gender) {
    return res.status(400).json({ error: "Please provide all fields" });
  }

  try {
    const user = await User.create({
      _id,
      name,
      email,
      dob,
      photo,
      gender,
    });
    return res.status(200).json({
      success: true,
      message: `Welcome ${user.age}`,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

export const getallUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    return res.status(200).json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

export const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) return res.status(400).json({ error: "Please provide user id" });

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) return res.status(400).json({ error: "Please provide user id" });

  try {
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};
