import express from "express";
import {
  logout,
  signin,
  signup,
  updateProfile,
} from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { uploadFiles } from "../middlewares/multer.js";

const router = express.Router();

router.route("/signin").post(signin);
router.route("/signup").post(uploadFiles, signup);
router.route("/logout").get(logout);
router
  .route("/profile/update")
  .post(isAuthenticated, uploadFiles, updateProfile);

export default router;
