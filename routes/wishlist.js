const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/WrapAsync.js");
const { validateListing, isLoggedIn, isOwner } = require("../middlewere.js");
const Listing = require("../models/listing.js");
const ListingController = require("../controllers/listings.js");
const wishlistcontroller = require("../controllers/wishlist.js");
const User = require("../models/user.js");
const { use } = require("passport");

router.get(
  "/",
  wrapAsync(async (req, res) => {
    let user = await User.findById(req.user._id).populate("wishlist");

    if (user.wishlist.length == 0) {
      req.flash("error", "No Wishlist found");
      return res.redirect("/listings");
    }

    res.render("listings/wishlist.ejs", { AllListings: user.wishlist });
  }),
);

router.post(
  "/add/:listingId",
  isLoggedIn,
  wrapAsync(wishlistcontroller.addwishlist),
);

router.post(
  "/remove/:listingId",
  isLoggedIn,
  wrapAsync(wishlistcontroller.removewishlist),
);

// router.get(
//   "/add",
//   wrapAsync(async (req, res) => {
//     let userId = res.locals.currUser;
//     console.log(userId);
//     res.send("user");
//   }),
// );

module.exports = router;
