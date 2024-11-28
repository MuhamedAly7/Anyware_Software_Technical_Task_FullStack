const express = require("express");
const userController = require("../controllers/user_controller");
const userRouter = express.Router();
const userValidation = require("../middlewares/validations/UserValidations");

userRouter.post(
  "/signup",
  userValidation.userSignupValidation(),
  userController.userSignup
);
userRouter.post(
  "/login",
  userValidation.userLoginValidation(),
  userController.userLogin
);

module.exports = userRouter;
