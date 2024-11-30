const jwt = require("jsonwebtoken");
const httpStatusText = require("../utils/HttpStatusText");
const appError = require("../utils/appError");

const verifyToken = (req, res, next) => {
  const authHeader =
    req.headers["Authorization"] || req.headers["authorization"];
  if (!authHeader) {
    const error = appError.make("Token is requied!", 401, httpStatusText.FAIL);
    return next(error);
  }
  const token = authHeader.split(" ")[1];
  try {
    const currentUser = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.currentUser = currentUser;
    next();
  } catch (err) {
    const error = appError.make("Invalid Token", 401, httpStatusText.ERROR);
    return next(error);
  }
};

// Bearer "token"

module.exports = verifyToken;
