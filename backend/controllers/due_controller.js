const asyncWrapper = require("../middlewares/asyncWrapper");
const Due = require("../models/due_model");
const { validationResult } = require("express-validator");
const appError = require("../utils/appError");
const httpStatusText = require("../utils/HttpStatusText");
const userRoles = require("../utils/userRoles");

const getDues = asyncWrapper(async (req, res, next) => {
  const dues = await Due.find({ isDeleted: false }, { _v: false });
  res.json({ status: httpStatusText.SUCCESS, data: dues });
});

const getDeletedDues = asyncWrapper(async (req, res, next) => {
  const deletedDues = await Due.find({ isDeleted: true }, { _v: false });
  res.json({ status: httpStatusText.SUCCESS, data: { deletedDues } });
});

const getDue = asyncWrapper(async (req, res, next) => {
  const due = await Due.find({
    _id: req.params.id,
    isDeleted: false,
  });
  if (!due) {
    const error = appError.make("Not Found Due!", 404, httpStatusText.FAIL);
    return next(error);
  }

  res.json({ status: httpStatusText.SUCCESS, data: { due } });
});

const createDue = asyncWrapper(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    messages = errors.array().map((error) => error.msg);
    const err = appError.make(messages, 400, httpStatusText.FAIL);
    return next(err);
  }

  const currentUserRole = req.currentUser.role;

  // Decode jwt data
  const dueData = { ...req.body, instructor: req.currentUser.id };

  const newDue = new Due(dueData);
  await newDue.save();
  res.status(201).json({
    status: httpStatusText.SUCCESS,
    data: { due: newDue },
  });
});

const updateDue = asyncWrapper(async (req, res, next) => {
  const due = await Due.findById(req.params.id);

  if (!due) {
    const error = appError.make("Not Found Due!", 404, httpStatusText.FAIL);
    return next(error);
  }

  if (due.instructor.toString() !== req.currentUser.id) {
    const error = appError.make(
      "Not allowed operation!",
      400,
      httpStatusText.FAIL
    );
    return next(error);
  }

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    messages = errors.array().map((error) => error.msg);
    const err = appError.make(messages, 400, httpStatusText.FAIL);
    return next(err);
  }

  const updatedDue = await Due.updateOne(
    {
      _id: req.params.id,
    },
    { $set: { ...req.body } }
  );

  return res.status(200).json({
    status: httpStatusText.SUCCESS,
    msg: "Due updated successfully",
  });
});

const softDeleteDue = asyncWrapper(async (req, res, next) => {
  const due = await Due.findById(req.params.id);

  if (!due || due.isDeleted) {
    const error = appError.make("Not Found Due!", 404, httpStatusText.FAIL);
    return next(error);
  }

  if (
    due.instructor.toString() !== req.currentUser.id &&
    req.currentUser.role === userRoles.instructor
  ) {
    const error = appError.make("Not allowed user", 400, httpStatusText.FAIL);
    return next(error);
  }

  const updatedDue = await Due.updateOne(
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

const recoverDue = asyncWrapper(async (req, res, next) => {
  const due = await Due.findById(req.params.id);
  if (!due || !due.isDeleted) {
    const error = appError.make(
      "Recover not needed!",
      404,
      httpStatusText.FAIL
    );
    return next(error);
  }

  const updatedDue = await Due.updateOne(
    {
      _id: req.params.id,
    },
    { $set: { isDeleted: false, deletedBy: null } }
  );

  return res.status(200).json({
    status: httpStatusText.SUCCESS,
    data: updatedDue,
  });
});

const deleteDue = asyncWrapper(async (req, res, next) => {
  await Due.deleteOne({ _id: req.params.id });
  return res.status(200).json({ status: httpStatusText.SUCCESS, data: null });
});

module.exports = {
  getDues,
  getDue,
  createDue,
  updateDue,
  softDeleteDue,
  getDeletedDues,
  recoverDue,
  deleteDue,
};
