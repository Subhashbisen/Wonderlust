const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const User = require("../models/user.js");

module.exports.addwishlist = async (req, res) => {
  let userId = res.locals.currUser;

  let curruser = await User.findByIdAndUpdate(userId, {
    $addToSet: { wishlist: req.params.listingId },
  });

  res.json({
    success: true,
  });
};

module.exports.removewishlist = async (req, res) => {
  let userId = res.locals.currUser;

  let curruser = await User.findByIdAndUpdate(userId, {
    $pull: { wishlist: req.params.listingId },
  });

  res.json({
    success: true,
  });
};

