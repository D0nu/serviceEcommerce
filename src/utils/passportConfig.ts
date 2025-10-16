// src/utils/passportConfig.ts
import passport from "passport";
import  { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as FacebookStrategy} from "passport-facebook";
import { Strategy as TwitterStrategy } from "passport-twitter";
import User from "../Models/User.model";
import dotenv from "dotenv";
dotenv.config();


type DoneFunction = (error: any, user?: any | false) => void;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: "/api/oauth/google/callback",
    },
     async (
      accessToken: string,
      refreshToken: string,
      profile: GoogleProfile,
      done: DoneFunction
    ) => {
      try {
        const email = profile.emails?.[0].value;
        const name = profile.displayName;
        const avatar = profile.photos?.[0].value;

        let user = await User.findOne({ email });
        if (!user) {
          user = new User({
            name,
            email,
            password: "", // no password for OAuth users
            avatar,
            role: "customer",
          });
          await user.save();
        }
        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

// Facebook Strategy
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
      callbackURL: "/api/oauth/facebook/callback",
      profileFields: ["id", "displayName", "photos", "email"],
    },
     async (
      accessToken: string,
      refreshToken: string,
      profile: FacebookProfile,
      done: DoneFunction
    ) => {
      try {
        const email = profile.emails?.[0].value;
        const name = profile.displayName;
        const avatar = profile.photos?.[0].value;

        let user = await User.findOne({ email });
        if (!user) {
          user = new User({
            name,
            email,
            password: "",
            avatar,
            role: "customer",
          });
          await user.save();
        }
        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

// Twitter Strategy
passport.use(
  new TwitterStrategy(
    {
      consumerKey: process.env.TWITTER_CLIENT_ID!,
      consumerSecret: process.env.TWITTER_CLIENT_SECRET!,
      callbackURL: "/api/oauth/twitter/callback",
      includeEmail: true,
    },
     async (
      accessToken: string,
      refreshToken: string,
      profile: TwitterProfile,
      done: DoneFunction
    ) => {
      try {
        const email = profile.emails?.[0].value;
        const name = profile.displayName;
        const avatar = profile.photos?.[0].value;

        let user = await User.findOne({ email });
        if (!user) {
          user = new User({
            name,
            email,
            password: "",
            avatar,
            role: "customer",
          });
          await user.save();
        }
        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

export default passport;
