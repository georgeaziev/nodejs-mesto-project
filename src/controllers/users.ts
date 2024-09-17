import { compare, hash } from "bcrypt";
import { NextFunction, Request, Response } from "express";
import { sign } from "jsonwebtoken";
import { StatuseCodes, tokenKey } from "../constants";
import User from "../models/userModel";

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.find();

    res.status(StatuseCodes.SUCCESS).send(users);
  } catch (error) {
    next(error);
  }
};

export const getOneUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(req.params.userId);

    res.status(StatuseCodes.SUCCESS).send(user);
  } catch (error) {
    next(error);
  }
};

export const getUserInfo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(req.user._id);

    res.status(StatuseCodes.SUCCESS).send(user);
  } catch (error) {
    next(error);
  }
};

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await User.validate(req.body);

    const newUser = { ...req.body, password: await hash(req.body.password, 8) };
    await User.create(newUser);

    res.status(StatuseCodes.CREATED).send("Created");
  } catch (error) {
    next(error);
  }
};

export const updateUserProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await User.findOneAndUpdate(
      {
        _id: req.user._id,
      },
      req.body
    );

    res.status(StatuseCodes.SUCCESS).send("Updated");
  } catch (error) {
    next(error);
  }
};

export const updateUserAvatar = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await User.validate(req.body, "avatar");

    const { avatar } = req.body;

    await User.findByIdAndUpdate(req.user._id, { avatar });

    res.status(StatuseCodes.SUCCESS).send("Avatar updated");
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await User.validate(req.body);

    const [user] = await User
      .find({ email: req.body.email })
      .select("+password");

    const isCorrectPassword = !!user
      ? await compare(req.body.password, user.password)
      : false;

    if (!isCorrectPassword) {
      return res
        .status(StatuseCodes.UNAUTHORIZED)
        .send({ message: "Incorrect email or password" });
    }

    return res
      .cookie("jwt-token", sign({ id: user._id }, tokenKey), {
        httpOnly: true,
        maxAge: 604800000,
      })
      .status(StatuseCodes.SUCCESS)
      .send("Logged in");
  } catch (error) {
    next(error);
  }
};
