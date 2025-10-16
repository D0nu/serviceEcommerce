import express from "express";
import { signup, signin,signOut } from "../Controllers/auth.controller";

const router = express.Router();

console.log("✅ Auth router file loaded");

router.get("/test", (req, res) => {
  res.send("Auth route is working!");
});

router.post("/signup", signup);
router.post("/signin", signin);
router.get('/signout', signOut)


export default router;
