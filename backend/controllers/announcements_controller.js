const { validationResult } = require("express-validator"); // for validation
const Announcement = require("../models/announcement_model");
const asyncWrapper = require("../middlewares/asyncWrapper");
const httpStatusText = require("../utils/HttpStatusText");
const appError = require("../utils/appError");
const jwt = require("../utils/generateJWTToken");
const userRoles = require("../utils/userRoles");

const getAnnouncements = asyncWrapper(async (req, res, next) => {
  const announcements = await Announcement.find(
    { isDeleted: false },
    { _v: false }
  );

  res.json({ status: httpStatusText.SUCCESS, data: announcements });
});

const getDeletedAnnouncements = asyncWrapper(async (req, res, next) => {
  const deletedAnnouncements = await Announcement.find(
    { isDeleted: true },
    { _v: false }
  );
  res.json({ status: httpStatusText.SUCCESS, data: { deletedAnnouncements } });
});

const getAnnouncement = asyncWrapper(async (req, res, next) => {
  const announcement = await Announcement.find({
    _id: req.params.id,
    isDeleted: false,
  });
  if (!announcement) {
    const error = appError.make(
      "Not Found Announcement!",
      404,
      httpStatusText.FAIL
    );
    return next(error);
  }

  res.json({ status: httpStatusText.SUCCESS, data: { announcement } });
});

const createAnnouncement = asyncWrapper(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    messages = errors.array().map((error) => error.msg);
    const err = appError.make(messages, 400, httpStatusText.FAIL);
    return next(err);
  }

  const currentUserRole = req.currentUser.role;

  // Decode jwt data
  const announcementData = {
    ...req.body,
    creator: req.currentUser.id,
    creatorName: req.currentUser.name,
  };

  const newAnnouncement = new Announcement(announcementData);
  await newAnnouncement.save();
  res.status(201).json({
    status: httpStatusText.SUCCESS,
    data: { annoucement: newAnnouncement },
  });
});

const updateAnnouncement = asyncWrapper(async (req, res, next) => {
  const annoucement = await Announcement.findById(req.params.id);

  if (!annoucement) {
    const error = appError.make(
      "Not Found Announcement!",
      404,
      httpStatusText.FAIL
    );
    return next(error);
  }

  if (annoucement.creator.toString() !== req.currentUser.id) {
    const error = appError.make("Not allowed user!", 400, httpStatusText.FAIL);
    return next(error);
  }

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    messages = errors.array().map((error) => error.msg);
    const err = appError.make(messages, 400, httpStatusText.FAIL);
    return next(err);
  }

  const updatedAnnoucement = await Announcement.updateOne(
    {
      _id: req.params.id,
    },
    { $set: { ...req.body } }
  );

  return res.status(200).json({
    status: httpStatusText.SUCCESS,
    msg: "Announcement updated successfully",
  });
});

const softDeleteAnnouncement = asyncWrapper(async (req, res, next) => {
  const annoucement = await Announcement.findById(req.params.id);

  if (!annoucement || annoucement.isDeleted) {
    const error = appError.make(
      "Not Found Announcement!",
      404,
      httpStatusText.FAIL
    );
    return next(error);
  }

  if (
    annoucement.creator.toString() !== req.currentUser.id &&
    req.currentUser.role === userRoles.instructor
  ) {
    const error = appError.make(
      "Not allowed operation!",
      400,
      httpStatusText.FAIL
    );
    return next(error);
  }

  const updatedAnnoucement = await Announcement.updateOne(
    {
      _id: req.params.id,
    },
    { $set: { isDeleted: true, deletedBy: req.currentUser.id } }
  );

  return res.status(200).json({
    status: httpStatusText.SUCCESS,
    data: null,
      id: req.params.id
  });
});

const recoverAnnouncement = asyncWrapper(async (req, res, next) => {
  const annoucement = await Announcement.findById(req.params.id);

  if (!annoucement || !annoucement.isDeleted) {
    const error = appError.make(
      "Rocover not needed!",
      404,
      httpStatusText.FAIL
    );
    return next(error);
  }

  const updatedAnnoucement = await Announcement.updateOne(
    {
      _id: req.params.id,
    },
    { $set: { isDeleted: false, deletedBy: null } }
  );

  return res.status(200).json({
    status: httpStatusText.SUCCESS,
    data: updatedAnnoucement,
  });
});

const deleteAnnouncement = asyncWrapper(async (req, res, next) => {
  await Announcement.deleteOne({ _id: req.params.id });
  return res.status(200).json({ status: httpStatusText.SUCCESS, data: null });
});

module.exports = {
  getAnnouncements,
  getAnnouncement,
  createAnnouncement,
  updateAnnouncement,
  softDeleteAnnouncement,
  getDeletedAnnouncements,
  recoverAnnouncement,
  deleteAnnouncement,
};
