import express from "express";

import isAuthenticated from "../middlewares/isAuthenticated.js";

import isAuthorized from "../middlewares/isAuthorized.js";
import {
  deleteJob,
  getAllJobs,
  getJobById,
  getPostedJobs,
  postJob,
} from "../controllers/jobs.controller.js";

const router = express.Router();

router.route("/post").post(isAuthenticated, isAuthorized, postJob);
router.route("/get").get(getAllJobs);
router.route("/get/:id").get(getJobById);
router.route("/posted").get(isAuthenticated, getPostedJobs);
router.route("/delete/:id").delete(isAuthenticated, isAuthorized, deleteJob);

export default router;
