const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["admin", "instructor", "student"],
    default: "student",
  },
  token: { type: String },
});

module.exports = mongoose.model("User", userSchema);
