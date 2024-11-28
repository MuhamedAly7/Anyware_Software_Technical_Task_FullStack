const mongoose = require("mongoose");

const dueSchema = new mongoose.Schema(
  {
    dueType: { type: String, enum: ["quiz", "assignment"], required: true },
    dueTitle: { type: String, required: true },
    dueCourse: { type: String, required: true },
    dueTopic: { type: String, required: true },
    dueDate: { type: String, required: true },
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isDeleted: { type: Boolean, default: false },
    deletedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    deletedAt: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Due", dueSchema);
