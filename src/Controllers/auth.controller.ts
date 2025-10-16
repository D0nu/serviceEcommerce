import { Request, Response, NextFunction } from "express";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken"
import { errorHandler } from "../utils/error";
import User from "../Models/User.model";


const JWT_SECRET: string = process.env.JWT_SECRET || "your-own";

export const signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password)
      return next(errorHandler(400, "All fields are required"));

    const existingUser = await User.findOne({ email });
    if (existingUser) return next(errorHandler(400, "Email already registered"));

    const hashedPassword = bcryptjs.hashSync(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });

    await newUser.save();
    res.status(201).json({ message: "User created successfully!" });
  } catch (error) {
    next(error);
  }
};



export const signin = async (req: Request, res: Response, next: NextFunction) => {
  
  const { name, password } = req.body;
  try {
    const validUser = await User.findOne ({ name });
    if (!validUser) return next(errorHandler(404, 'Invalid credentials'));
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, 'Invalid credentials' ));
    const token = jwt.sign({ id: validUser._id }, JWT_SECRET, { expiresIn: "1h" });
    const userObject = validUser.toObject();
    const { password: pass, ...rest } = userObject;
    res
    .cookie('access_token', token, { httpOnly: true })
    .status(200)
    .json(rest)
  } catch (error) {
    next(errorHandler(500, "Server error"));
  }
}

export const signOut = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.clearCookie('access_token');
    res.status(200).json('User has been logged out!');
  } catch (error) {
    next(error);
  }
};