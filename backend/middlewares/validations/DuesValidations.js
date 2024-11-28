const { body } = require("express-validator");

const dueValidations = () => {
  return [
    body("dueType")
      .notEmpty()
      .withMessage("Due type is required!")
      .isIn(["quiz", "assignment"])
      .withMessage("Invalid due type!"),
    body("dueTitle")
      .notEmpty()
      .withMessage("Due title is required")
      .isLength({ max: 50 })
      .withMessage("Too long due title!"),
    body("dueCourse")
      .notEmpty()
      .withMessage("Due name is required")
      .isLength({ max: 50 })
      .withMessage("Too long due name!"),
    body("dueTopic")
      .notEmpty()
      .withMessage("Due topic is required!")
      .isLength({ max: 100 })
      .withMessage("Too long due topic"),
    body("dueDate")
      .notEmpty()
      .withMessage("Due date is required!")
      .isLength({ max: 20 })
      .withMessage("Wrong date format!"),
  ];
};

module.exports = {
  dueValidations,
};
