import { NextFunction, Request, Response } from "express";
import { JwtPayload, verify } from "jsonwebtoken";
import { tokenKey } from "../constants";

export const auth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const [_, token] = req.headers.authorization?.split(" ") || "";

    const payload = verify(token, tokenKey) as JwtPayload;

    req.user = { _id: payload.id };

    next();
  } catch {
    next("Unauthorized");
  }
};
