const mongoose = require("mongoose");
const Listing = require("../models/listing");
const initdata = require("./data");

main()
  .then(() => {
    console.log("Connected to MongoDB succesfully");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/Wonderlust");
}

const initDB = async () => {
  try {
    await Listing.deleteMany({});
    initdata.data = initdata.data.map((obj) => ({
      ...obj,
      owner: "69cfcd0b17a33696f3fd0e15",
      categories: "Apartment",
      geometry: {
        type: "Point",
        coordinates: [79.08886, 21.146633],
      },
    }));
    await Listing.insertMany(initdata.data);
    console.log("data Was Initialize");
  } catch (error) {
    console.log("eror :", error);
  }
};

initDB();
