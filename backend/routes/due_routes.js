const express = require("express");

const dueController = require("../controllers/due_controller");
const verifyToken = require("../middlewares/verifyToken");
const dueValidations = require("../middlewares/validations/DuesValidations");
const allowedTo = require("../middlewares/allowedTo");
const userRoles = require("../utils/userRoles");

const dueRouter = express.Router();

dueRouter
  .route("/")
  .get(verifyToken, dueController.getDues)
  .post(
    verifyToken,
    allowedTo(userRoles.instructor),
    dueValidations.dueValidations(),
    dueController.createDue
  );

dueRouter.get("/:id", verifyToken, dueController.getDue);

dueRouter.patch(
  "/:id/update",
  verifyToken,
  allowedTo(userRoles.instructor),
  dueController.updateDue
);

// Soft delete
dueRouter.patch(
  "/:id/soft_delete",
  verifyToken,
  allowedTo(userRoles.instructor, userRoles.admin),
  dueController.softDeleteDue
);

dueRouter.get(
  "/get/deleted",
  verifyToken,
  allowedTo(userRoles.admin),
  dueController.getDeletedDues
);

// Recovers
dueRouter.patch(
  "/:id/recover",
  verifyToken,
  allowedTo(userRoles.admin),
  dueController.recoverDue
);

// Hard delete
dueRouter.delete(
  "/:id/delete",
  verifyToken,
  allowedTo(userRoles.admin),
  dueController.deleteDue
);

module.exports = dueRouter;
