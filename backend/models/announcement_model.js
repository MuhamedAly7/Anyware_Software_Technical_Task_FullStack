const mongoose = require("mongoose");
const announcementSchema = new mongoose.Schema(
  {
    topic: { type: String, required: true },
    description: { type: String, required: true },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    creatorName: { type: String },
    isDeleted: { type: Boolean, default: false },
    deletedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    deletedAt: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Announcement", announcementSchema);
