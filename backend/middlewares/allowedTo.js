const appError = require("../utils/appError");
const httpStatusText = require("../utils/HttpStatusText");
module.exports = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.currentUser.role)) {
      const error = appError.make(
        "Not allowed user!",
        400,
        httpStatusText.FAIL
      );
      return next(error);
    }
    next();
  };
};
