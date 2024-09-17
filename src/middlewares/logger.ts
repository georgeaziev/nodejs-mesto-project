import { NextFunction, Request, Response } from "express";
import fs from "fs";
import { requestObjectKeys } from "../constants";

export const logger =
  (requestError?: unknown) =>
  (req: Request, res: Response, next: NextFunction) => {
    if (requestError) {
      appendFile("error.log", requestError, next);
    } else {
      const log = {} as Record<string, {}>;
      requestObjectKeys.forEach(
        (key) => (log[key] = req[key as keyof Request])
      );

      appendFile("request.log", log, next);
    }
  };

const appendFile = (
  name: string,
  info: Record<string, {}> | unknown,
  next: NextFunction
) => {
  fs.appendFile(`./${name}`, JSON.stringify(info) + "\n", (error) =>
    next(error)
  );
};
