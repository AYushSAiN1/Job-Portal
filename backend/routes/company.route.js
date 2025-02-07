import express from "express";

import isAuthenticated from "../middlewares/isAuthenticated.js";
import {
  getCompany,
  getCompanyById,
  registerCompany,
  updateCompany,
} from "../controllers/company.controller.js";
import isAuthorized from "../middlewares/isAuthorized.js";
import { uploadFiles } from "../middlewares/multer.js";

const router = express.Router();

router
  .route("/register")
  .post(isAuthenticated, isAuthorized, uploadFiles, registerCompany);
router.route("/get").get(isAuthenticated, getCompany);
router.route("/get/:id").get(getCompanyById);
router
  .route("/update/:id")
  .put(isAuthenticated, isAuthorized, uploadFiles, updateCompany);

export default router;
