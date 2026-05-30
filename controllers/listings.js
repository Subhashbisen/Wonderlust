const Listing = require("../models/listing");

module.exports.index = async (req, res) => {
  let AllListings = await Listing.find({});
  res.render("listings/index.ejs", { AllListings });
};

module.exports.renderNewform = (req, res) => {
  res.render("listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");
  if (!listing) {
    req.flash("error", "Listing you requested for does not exist");
    return res.redirect("/listings");
  }

  // console.log(listing);
  res.render("listings/show.ejs", { listing });
};

module.exports.createListing = async (req, res) => {
  if (!req.body) {
    throw new ExpressError(400, "Send Valid Data For Listing");
  }

  const cordinates = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&q=${req.body.location}`,
    {
      headers: {
        "User-Agent": "test-app",
      },
    },
  );

  const data = await cordinates.json();

  let lat = parseFloat(data[0].lat);
  let lng = parseFloat(data[0].lon);

  let url = req.file.path;
  let filename = req.file.filename;

  let { title, description, image, price, country, location, categories } =
    req.body;

  let newListing = new Listing({
    title: title,
    description: description,
    image: {
      url: url,
      filename: filename,
    },
    price: price,
    country: country,
    location: location,
    categories: categories,
    geometry: {
      type: "Point",
      coordinates: [lng, lat],
    },
  });
  newListing.owner = req.user._id;
  // newListing.image.url = url;
  // newListing.image.filename = filename;
  await newListing.save();

  req.flash("success", "New Listing Created");
  res.redirect("/listings");
};

module.exports.renderEditlisting = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing you requested for does not exist");
    return res.redirect("/listings");
  }

  let originalImageurl = listing.image.url;
  originalImageurl = originalImageurl.replace("/upload", "/upload/w-250");

  res.render("listings/edit.ejs", { listing, originalImageurl });
};

module.exports.updateListing = async (req, res) => {
  if (!req.body) {
    throw new ExpressError(400, "Send Valid Data For Listing");
  }

  let { id } = req.params;
  let { title, description, image, price, country, location } = req.body;

  let listing = await Listing.findByIdAndUpdate(
    id,
    {
      title: title,
      description: description,
      price: price,
      country: country,
      location: location,
    },
    { runValidators: true, new: true },
  );

  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image.url = url;
    listing.image.filename = filename;
    await listing.save();
  }
  req.flash("success", "Listing Update");
  res.redirect(`/listings/${id}`);
};

module.exports.deleteListing = async (req, res) => {
  let { id } = req.params;
  let deleteListing = await Listing.findByIdAndDelete(id);
  req.flash("success", "Listing Deleted");
  res.redirect("/listings");
};

// * filter logic
module.exports.filterListings = async (req, res) => {
  let { category } = req.params;

  let AllListings = await Listing.find({
    categories: category,
  });

  if (AllListings.length === 0) {
    req.flash("error", "No listings found in this category 😔");
    return res.redirect("/listings");
  }

  res.render("listings/index.ejs", { AllListings });
};
