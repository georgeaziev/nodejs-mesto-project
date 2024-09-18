import { celebrate, Joi } from "celebrate";
import { URL_REGEXP } from "../constants";

export const signinValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

export const signupValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2),
    about: Joi.string().max(100),
    avatar: Joi.string().pattern(URL_REGEXP),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

export const getOneUserValidator = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required(),
  }),
});

export const updateUserValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2),
    about: Joi.string().max(100),
    email: Joi.string().email(),
    password: Joi.string(),
  }),
});

export const updateAvatarValidator = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required(),
  }),
});

export const createCardValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().pattern(URL_REGEXP).required(),
    createdAt: Joi.date(),
  }),
});

export const cardParamsdValidator = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required(),
  }),
});
