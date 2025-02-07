import express from "express";

import isAuthenticated from "../middlewares/isAuthenticated.js";
import isAuthorized from "../middlewares/isAuthorized.js";
import {
  createApplication,
  getApplicants,
  getApplications,
  updateStatus,
} from "../controllers/application.controller.js";

const router = express.Router();

router.route("/apply/:id").post(isAuthenticated, createApplication);
router.route("/get").get(isAuthenticated, getApplications);
router.route("/:id/applicants").get(isAuthorized, getApplicants);
router.route("/:id/update").put(isAuthenticated, isAuthorized, updateStatus);

export default router;
