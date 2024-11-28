const mongoose = require("mongoose");

const connectTo = async (uri) => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(uri);
    console.log("Connected to mongodb successfully!");
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  connectTo,
};
