// server/src/Models/Order.model.ts
import mongoose, { Schema, Document } from "mongoose";
import { Order } from "../types/orderType"; // adjust path if needed

interface IOrder extends Document, Order {}

const OrderSchema = new Schema<IOrder>(
  {
    userId: { type: String, required: true },
    items: [
      {
        productId: { type: String, required: true },
        storeId: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    ],
    totalAmount: { type: Number, required: true },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const OrderModel = mongoose.model<IOrder>("Order", OrderSchema);
export default OrderModel;
