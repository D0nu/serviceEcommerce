import { Request, Response, NextFunction } from "express";
import User from "../Models/User.model";
import CartModel from "../Models/Cart.model";
import OrderModel from "../Models/Order.model";
import { errorHandler } from "../utils/error";
import bcryptjs from "bcryptjs";

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, 'You can only update your own account!'));
  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );

    if (!updatedUser) return next(errorHandler(404, "User not found"));

    const userObject = updatedUser.toObject();
    const { password, ...rest } = userObject;

    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};



// Delete user and all associated data
export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Ensure user can only delete their own account
    if (req.user._id.toString() !== req.params.id)
      return next(errorHandler(401, "You can only delete your own account!"));

    const userId = req.params.id;

    // Delete user
    await User.findByIdAndDelete(userId);

    // Delete all carts for this user
    await CartModel.deleteMany({ userId });

    // Delete all orders for this user
    await OrderModel.deleteMany({ userId });

    // Optional: delete revenue distributions if you track per user
    // await RevenueDistributionModel.deleteMany({ userId }); // if applicable

    // Clear session/cookies
    res.clearCookie("access_token");

    res.status(200).json({ message: "User and all associated data have been deleted!" });
  } catch (error) {
    next(error);
  }
};

// Get user (excluding password)
export const getUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    if (!id) return next(errorHandler(400, "User ID is required"));

    const user = await User.findById(id).lean(); // plain JS object

    if (!user) return next(errorHandler(404, "User not found!"));

    const { password, ...rest } = user; // exclude password

    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};
