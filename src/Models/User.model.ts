import mongoose, { Schema, Document } from "mongoose";
import { UserRole } from "../types/userType";

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  avatar?: string;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["admin", "store_owner", "customer"],
      default: "customer",
    },
    avatar: {
      type: String,
      default:
        "https://www.freeiconspng.com/thumbs/profile-icon-png/profile-icon-9.png",
    },
  },
  { timestamps: true }
);

const User = mongoose.model<IUser>("User", userSchema);
export default User;
