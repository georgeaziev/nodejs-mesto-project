import { NextFunction, Request, Response } from "express";
import { StatuseCodes } from "../constants";
import { logger } from "./logger";

export const clientErrorsHandler = (
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger(error)(req, res, next);

  if (String(error).includes("ValidationError")) {
    return res
      .status(StatuseCodes.BAD_REQUEST)
      .send({ message: "Переданы некорректные данные" });
  }

  if (String(error).includes("Cast to ObjectId failed")) {
    return res
      .status(StatuseCodes.NOT_FOUND)
      .send({ message: "Объект не найден" });
  }

  if (String(error).includes("MongooseError")) {
    return res
      .status(StatuseCodes.DB_CONNECTION_ERR)
      .send({ message: "Ошибка: " + error });
  }

  if (String(error) === "Unauthorized") {
    return res
      .status(StatuseCodes.UNAUTHORIZED)
      .send({ message: "Ошибка: " + error });
  }

  if (String(error).includes("E11000")) {
    return res
      .status(StatuseCodes.CONFLICT)
      .send({ message: "Ошибка: " + error });
  }

  return res.status(StatuseCodes.ERROR).send({ message: "Ошибка: " + error });
};

export const notFoundErrorHandler = (req: Request, res: Response) => {
  res.status(StatuseCodes.NOT_FOUND).send({ message: "Not Found" });
};
