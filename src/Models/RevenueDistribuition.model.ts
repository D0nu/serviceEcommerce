// server/src/Models/RevenueDistribution.model.ts
import mongoose, { Schema, Document } from "mongoose";
import { RevenueDistribution } from "../types/orderType";

interface IRevenueDistribution extends Document, RevenueDistribution {}

const RevenueDistributionSchema = new Schema<IRevenueDistribution>(
  {
    orderId: { type: String, required: true },
    storeId: { type: String, required: true },
    storeOwnerId: { type: String, required: true },
    amount: { type: Number, required: true },
    platformFee: { type: Number, required: true },
    netAmount: { type: Number, required: true },
    status: { type: String, enum: ["pending", "processed"], default: "pending" },
  },
  { timestamps: true }
);

const RevenueDistributionModel = mongoose.model<IRevenueDistribution>(
  "RevenueDistribution",
  RevenueDistributionSchema
);
export default RevenueDistributionModel;
