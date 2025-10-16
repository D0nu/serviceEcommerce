// src/routes/oauth.routes.ts
import express from "express";
import passport from "../utils/passportConfig";
import { oauthCallback } from "../Controllers/oauth.controller";

const router = express.Router();

// GOOGLE
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
router.get("/google/callback", passport.authenticate("google", { session: false }), oauthCallback);

// FACEBOOK
router.get("/facebook", passport.authenticate("facebook", { scope: ["email"] }));
router.get("/facebook/callback", passport.authenticate("facebook", { session: false }), oauthCallback);

// TWITTER
router.get("/twitter", passport.authenticate("twitter"));
router.get("/twitter/callback", passport.authenticate("twitter", { session: false }), oauthCallback);

export default router;
