import mongoose from "mongoose";
import { isEmail, isURL } from "validator";

interface IUser {
  name: string;
  about: string;
  avatar: string;
  email: string;
  password: string;
}

export const userSchema = new mongoose.Schema({
  name: { type: String, minLength: 2, maxLength: 30, default: "Жак-Ив Кусто" },
  about: {
    type: String,
    minLength: 2,
    maxLength: 200,
    default: "Исследователь",
  },
  avatar: {
    type: String,
    default:
      "https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png",
    validate: {
      validator: function (url: string) {
        return isURL(url);
      },
    },
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: function (email: string) {
        return isEmail(email);
      },
    },
  },
  password: { type: String, unique: true, required: true, select: false },
});

export default mongoose.model<IUser>("user", userSchema);
