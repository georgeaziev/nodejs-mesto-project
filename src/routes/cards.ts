import { Router } from "express";
import {
  createCard,
  deleteCard,
  getCards,
  likeCard,
  unlikeCard,
} from "../controllers/cards";
import {
  cardParamsdValidator,
  createCardValidator,
} from "../middlewares/validators";

const router = Router();

router.get("/", getCards);
router.post("/", createCardValidator, createCard);
router.delete("/:cardId", cardParamsdValidator, deleteCard);
router.put("/:cardId/likes", cardParamsdValidator, likeCard);
router.delete("/:cardId/likes", cardParamsdValidator, unlikeCard);

export default router;
