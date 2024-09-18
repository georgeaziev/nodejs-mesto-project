import { Router } from "express";
import {
  getOneUser,
  getUserInfo,
  getUsers,
  updateUserAvatar,
  updateUserProfile,
} from "../controllers/users";
import {
  getOneUserValidator,
  updateAvatarValidator,
  updateUserValidator,
} from "../middlewares/validators";

const router = Router();

router.get("/", getUsers);
router.get("/me", getUserInfo);
router.patch("/me", updateUserValidator, updateUserProfile);
router.patch("/me/avatar", updateAvatarValidator, updateUserAvatar);

router.get("/:userId", getOneUserValidator, getOneUser);

export default router;
