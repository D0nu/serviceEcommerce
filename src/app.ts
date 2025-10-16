console.log("🟢 Starting app.ts");
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
console.log("🟢 Imports complete");
import userRouter from "./Routes/user.route";
import authRouter from "./Routes/auth.route";
console.log("🟢 Routers imported");
import { CustomError } from "./utils/error";
import oauthRoutes from "./Routes/oauth.routes";
import session from "express-session";
import passport from "./utils/passportConfig"
import facebookRouter from "./Routes/facebook.route";


dotenv.config();

console.log("🟢 Environment loaded");

const MONGO_URI: string = process.env.MONGO_URI || "";

// MongoDB Connection
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

const app = express();

// Middleware
app.use(cors({
  origin: "https://client-ecommerce-sage.vercel.app",
  credentials: true
}));

app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());

console.log("🟢 Middleware registered");

// 🔥 TEMP TEST ROUTE
app.get("/ping", (req: Request, res: Response) => {
 res.send("pong 🏓");
});

// Routes
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/oauth", oauthRoutes);
app.use("/api/facebook", facebookRouter);

console.log("🟢 Ping route registered");

// Error Handler
app.use((err: CustomError, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

// Start Server
const PORT = process.env.PORT || 5050;

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
console.log("✅ App setup complete");

export default app;
