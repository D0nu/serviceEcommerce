// server/src/Models/Cart.model.ts
import mongoose, { Schema, Document } from "mongoose";
import { Cart, CartItem } from "../types/cartType"; // adjust path if needed

interface ICartItem extends CartItem {}

interface ICart extends Document, Cart {}

const CartItemSchema = new Schema<ICartItem>(
  {
    productId: { type: String, required: true },
    storeId: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
  },
  { _id: false } // prevent Mongoose from adding an _id to each item
);

const CartSchema = new Schema<ICart>(
  {
    userId: { type: String, required: true, unique: true }, // one cart per user
    items: { type: [CartItemSchema], default: [] },
    total: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);

const CartModel = mongoose.model<ICart>("Cart", CartSchema);
export default CartModel;
