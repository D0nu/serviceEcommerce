// src/controllers/oauthController.ts
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/error";

export const oauthCallback = async (req: Request, res: Response) => {
  try {
    const user = req.user as any;

    if (!user) throw errorHandler(400, "Authentication failed");

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    // Redirect to frontend with token (adjust URL)
    res.redirect(`${process.env.CLIENT_URL}/auth/success?token=${token}`);
  } catch (error) {
    res.redirect(`${process.env.CLIENT_URL}/auth/error`);
  }
};
