const { validationResult } = require("express-validator");
const User = require("../models/user_model");
const httpStatusText = require("../utils/HttpStatusText");
const asyncWrapper = require("../middlewares/asyncWrapper");
const appError = require("../utils/appError");
const bcrypt = require("bcryptjs");
const generateJWTToken = require("../utils/generateJWTToken");

const userSignup = asyncWrapper(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    messages = errors.array().map((error) => error.msg);
    const err = appError.make(messages, 400, httpStatusText.FAIL);
    return next(err);
  }

  const { password_confirmation, password, ...userData } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ ...userData, password: hashedPassword });

  // Generate JWT token
  const token = await generateJWTToken(
    {
      id: newUser._id,
      name: newUser.name,
      username: newUser.username,
      role: newUser.role,
    },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "2m" }
  );
  newUser.token = token;
  await newUser.save();

  res.status(201).json({ status: httpStatusText.SUCCESS, data: newUser });
});

const userLogin = asyncWrapper(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    messages = errors.array().map((error) => error.msg);
    const err = appError.make(messages, 400, httpStatusText.FAIL);
    return next(err);
  }

  const { username, password } = req.body;

  const user = await User.findOne({ username: username });
  if (!user) {
    const err = appError.make("user not found!", 400, httpStatusText.FAIL);
    return next(err);
  }
  const matchedPassword = await bcrypt.compare(password, user.password);
  if (user && matchedPassword) {
    // Logged In Successfully
    const token = await generateJWTToken(
      {
        id: user._id,
        name: user.name,
        username: user.username,
        role: user.role,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: process.env.JWT_EXPIRATION_TIME }
    );
    return res.json({
      status: httpStatusText.SUCCESS,
      data: {
        id: user._id,
        name: user.name,
        username: user.username,
        role: user.role,
        token: token,
      },
    });
  } else {
    const err = appError.make(
      "username or passowrd wrong!",
      500,
      httpStatusText.ERROR
    );
    return next(err);
  }
});

module.exports = {
  userSignup,
  userLogin,
};
