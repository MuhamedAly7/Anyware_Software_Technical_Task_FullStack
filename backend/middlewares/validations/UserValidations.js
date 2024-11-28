const { body } = require("express-validator");
const User = require("../../models/user_model");

const passwordConfirmationValidator = (value, { req }) => {
  if (value !== req.body.password) {
    throw new Error("Password confirmation does not match password!");
  }
  return true;
};

const uniqueUsernameValidation = async (value) => {
  const existingUser = await User.findOne({ username: value });
  if (existingUser) {
    throw new Error("Username is already exists!");
  }
  return true;
};

const userSignupValidation = () => {
  return [
    body("name")
      .notEmpty()
      .withMessage("Name is required!")
      .isLength({ max: 25 })
      .withMessage("Name is too  long!")
      .isAlpha()
      .withMessage("Name should not have numbers"),
    body("username")
      .notEmpty()
      .withMessage("Username is required!")
      .isLength({ max: 25 })
      .isAlphanumeric()
      .withMessage("username must contains letters and numbers only!")
      .custom(uniqueUsernameValidation),
    body("password")
      .notEmpty()
      .withMessage("Password is required!")
      .isLength({ min: 6 })
      .withMessage("Password must be more than 5 characters"),
    body("password_confirmation")
      .notEmpty()
      .withMessage("Password confirmation is required!")
      .custom(passwordConfirmationValidator),
  ];
};

const userLoginValidation = () => {
  return [
    body("username").notEmpty().withMessage("username is required!"),
    body("password").notEmpty().withMessage("password is required!"),
  ];
};

const userLogoutValidation = () => {
  return [
    body("username").notEmpty().withMessage("username is required!"),
  ];
};

module.exports = {
  userSignupValidation,
  userLoginValidation,
  userLogoutValidation,
};
