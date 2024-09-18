import express from "express";

import { errors } from "celebrate";
import "dotenv/config";
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
import { signinValidator, signupValidator } from "./middlewares/validators";

const app = express();
const port = 3000;
const mongodbPort = process.env.MONGO_DB_PORT || "mongodb://localhost:27017";

mongoose.connect(mongodbPort + "/mestodb");

app.use(express.json());
app.use(logger());

app.post("/signin", signinValidator, login);
app.post("/signup", signupValidator, createUser);

app.use(auth);

app.use("/users", usersRouter);
app.use("/cards", cardsRouter);

app.use(errors());

app.use(notFoundErrorHandler);
app.use(clientErrorsHandler);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
