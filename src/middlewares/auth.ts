import { NextFunction, Request, Response } from "express";
import { JwtPayload, verify } from "jsonwebtoken";
import { tokenKey } from "../constants";

export const auth = (req: Request, _res: Response, next: NextFunction) => {
  try {
    const token = req.cookies["jwt-token"];
    const payload = verify(token, tokenKey) as JwtPayload;

    req.user = { _id: payload.id };

    next();
  } catch {
    next("Unauthorized");
  }
};
