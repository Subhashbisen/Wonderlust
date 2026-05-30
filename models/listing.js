const mongoose = require("mongoose");
const Review = require("./review");
const User = require("./user");

const ListingSchema = new mongoose.Schema({
  title: { type: String },
  description: { type: String },
  image: {
    url: String,
    filename: String,
  },
  price: { type: Number },
  location: { type: String },
  country: { type: String },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  categories: {
    type: [String],
    enum: [
      "All",
      "Apartment",
      "Villa",
      "Farmhouse",
      "Beachfront",
      "Mountain",
      "City",
      "Budget",
      "Luxury",
    ],
  },
  geometry: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number], // [lng, lat]
      required: true,
    },
  },
});

ListingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await Review.deleteMany({ _id: { $in: listing.reviews } });
  }
});

const Listing = mongoose.model("Listing", ListingSchema);

module.exports = Listing;
