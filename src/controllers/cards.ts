import { NextFunction, Request, Response } from "express";
import { StatuseCodes } from "../constants";
import Card from "../models/cardModel";

export const getCards = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const cards = await Card.find();

    res.status(StatuseCodes.SUCCESS).send(cards);
  } catch (error) {
    next(error);
  }
};

export const createCard = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await Card.create({ ...req.body, owner: req.user._id });

    res.status(StatuseCodes.CREATED).send({ message: "Created" });
  } catch (error) {
    next(error);
  }
};

export const deleteCard = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const card = await Card.findById(req.params.cardId);

    if (String(card?.owner) === req.user._id) {
      await card?.deleteOne();

      return res.status(StatuseCodes.SUCCESS).send({ message: "Deleted" });
    }

    res
      .status(StatuseCodes.FORBIDDEN)
      .send({ message: "Вы не можете удалять карточки других пользователей" });
  } catch (error) {
    next(error);
  }
};

export const likeCard = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const card = await Card.findByIdAndUpdate(
      { _id: req.params.cardId },
      { $addToSet: { likes: req.user._id } },
      { new: true }
    );

    res.status(StatuseCodes.SUCCESS).send(card);
  } catch (error) {
    next(error);
  }
};

export const unlikeCard = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await Card.updateOne(
      { _id: req.params.cardId },
      {
        $pull: {
          likes: req.user._id,
        },
      },
      { new: true }
    );

    res.status(StatuseCodes.SUCCESS).send({ message: "Unliked" });
  } catch (error) {
    next(error);
  }
};
