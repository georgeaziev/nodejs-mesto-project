import { Router } from "express";
import {
  getOneUser,
  getUserInfo,
  getUsers,
  updateUserAvatar,
  updateUserProfile,
} from "../controllers/users";

const router = Router();

router.get("/", getUsers);
router.get("/me", getUserInfo);
router.patch("/me", updateUserProfile);
router.patch("/me/avatar", updateUserAvatar);

router.get("/:userId", getOneUser);

export default router;
