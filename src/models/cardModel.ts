import { ObjectId } from "mongodb";
import mongoose from "mongoose";
import { isURL } from "validator";

interface ICard {
  name: string;
  link: string;
  owner: ObjectId | string;
  likes: Array<ObjectId>;
  createdAt: Date;
}

const cardSchema = new mongoose.Schema({
  name: { type: String, required: true, minLength: 2, maxLength: 30 },
  link: {
    type: String,
    required: true,
    validate: {
      validator: function (url: string) {
        return isURL(url);
      },
    },
  },
  owner: { type: ObjectId },
  likes: { type: Array<ObjectId>, default: [] },
  createdAt: { type: Date, default: Date.now() },
});

cardSchema.set("validateBeforeSave", true);

export default mongoose.model<ICard>("card", cardSchema);
