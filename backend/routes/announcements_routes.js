const express = require("express");
const announcementsController = require("../controllers/announcements_controller");
const announcementValidations = require("../middlewares/validations/AnnouncementValidations");
const verifyToken = require("../middlewares/verifyToken");
const allowedTo = require("../middlewares/allowedTo");
const userRoles = require("../utils/userRoles");

const announcementsRouter = express.Router();

announcementsRouter
  .route("/")
  .get(verifyToken, announcementsController.getAnnouncements)
  .post(
    verifyToken,
    allowedTo(userRoles.instructor, userRoles.admin),
    announcementValidations.AnnouncementValidations(),
    announcementsController.createAnnouncement
  );

announcementsRouter.get(
  "/:id",
  verifyToken,
  announcementsController.getAnnouncement
);

announcementsRouter.get(
  "/get/deleted",
  verifyToken,
  allowedTo(userRoles.admin),
  announcementsController.getDeletedAnnouncements
);

announcementsRouter.patch(
  "/:id/update",
  verifyToken,
  allowedTo(userRoles.instructor),
  announcementsController.updateAnnouncement
);

// Soft delete
announcementsRouter.patch(
  "/:id/soft_delete",
  verifyToken,
  allowedTo(userRoles.admin, userRoles.instructor),
  announcementsController.softDeleteAnnouncement
);

// Deleted
announcementsRouter.get(
  "/:id/recover",
  verifyToken,
  allowedTo(userRoles.admin),
  announcementsController.getDeletedAnnouncements
);

// Recover
announcementsRouter.patch(
  "/:id/recover",
  verifyToken,
  allowedTo(userRoles.admin),
  announcementsController.recoverAnnouncement
);

// Hard delete
announcementsRouter.delete(
  "/:id/delete",
  verifyToken,
  allowedTo(userRoles.admin),
  announcementsController.deleteAnnouncement
);

module.exports = announcementsRouter;
