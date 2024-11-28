const { body } = require("express-validator");

const AnnouncementValidations = () => {
  return [
    body("topic")
      .notEmpty()
      .withMessage("topic is required")
      .isLength({ max: 50 })
      .withMessage("Topic text is too long"),
    body("description").notEmpty().withMessage("description is required"),
  ];
};

module.exports = {
  AnnouncementValidations,
};
