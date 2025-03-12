require("dotenv").config();
const OAuth2Strategy = require("passport-google-oauth2").Strategy;
const Role = require("../models/role.models");
const User = require("../models/user.models");
const passport = require("passport");
passport.use(
  new OAuth2Strategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.REDIRECT_URI,
      scope: ["email", "profile"],
    },
    async function (accessToken, refreshToken, profile, done) {
      try {
        let user = await User.findOne({ googleId: profile.id });
        const role = await Role.findOne({ role_name: "user" });
        const role_id = role._id;
        const role_name = role.role_name;
        if (!user) {
          user = new User({
            username: profile.displayName,
            email: profile.emails[0].value,
            googleId: profile.id,
            role_id,
            role_name,
          });
          await user.save();
        }
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
