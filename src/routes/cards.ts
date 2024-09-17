import { Router } from "express";
import {
  createCard,
  deleteCard,
  getCards,
  likeCard,
  unlikeCard,
} from "../controllers/cards";

const router = Router();

router.get("/", getCards);
router.post("/", createCard);
router.delete("/:cardId", deleteCard);
router.put("/:cardId/likes", likeCard);
router.delete("/:cardId/likes", unlikeCard);

export default router;
