import express from "express";

import mongoose from "mongoose";
import { createUser, login } from "./controllers/users";
import { auth } from "./middlewares/auth";
import {
  clientErrorsHandler,
  notFoundErrorHandler,
} from "./middlewares/errorsHandler";
import { logger } from "./middlewares/logger";
import cardsRouter from "./routes/cards";
import usersRouter from "./routes/users";

const app = express();
const port = 3000;

mongoose.connect("mongodb://localhost:27017/mestodb");

app.use(express.json());
app.use(logger());

app.post("/signin", login);
app.post("/signup", createUser);

app.use(auth);

app.use("/users", usersRouter);
app.use("/cards", cardsRouter);

app.use(notFoundErrorHandler);
app.use(clientErrorsHandler);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
