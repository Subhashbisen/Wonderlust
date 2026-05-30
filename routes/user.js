const express = require("express");
const wrapAsync = require("../utils/WrapAsync");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");
const { saveRedirectUrl } = require("../middlewere");

let userControllers = require("../controllers/user");

router.get("/signup", userControllers.renderSignupform);

router.post("/signup", wrapAsync(userControllers.signUp));

router.get("/login", userControllers.renderLoginform);

router.post(
  "/login",
  saveRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  userControllers.login,
);

router.get("/logout", userControllers.logOut);

module.exports = router;
