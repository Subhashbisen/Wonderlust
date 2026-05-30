const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/WrapAsync.js");
const { validateListing, isLoggedIn, isOwner } = require("../middlewere.js");
const Listing = require("../models/listing.js");
const ListingController = require("../controllers/listings.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

//* show All Listings index route
router.get("/", wrapAsync(ListingController.index));

// * new route
router.get("/new", isLoggedIn, ListingController.renderNewform);

// * post a listing
router.post(
  "/",
  isLoggedIn,
  upload.single("image"),
  validateListing,
  wrapAsync(ListingController.createListing),
);

//* edit Route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(ListingController.renderEditlisting),
);

// * Update Route
router.put(
  "/:id",
  isLoggedIn,
  isOwner,
  upload.single("image"),
  validateListing,
  wrapAsync(ListingController.updateListing),
);

// * show specific listing using id
router.get("/:id", wrapAsync(ListingController.showListing));

//* delete route
router.delete(
  "/:id",
  isLoggedIn,
  isOwner,
  wrapAsync(ListingController.deleteListing),
);

// * filter logic
router.get("/filter/:category", wrapAsync(ListingController.filterListings));

module.exports = router;
