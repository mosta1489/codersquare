import express, { RequestHandler, ErrorRequestHandler } from "express";
import { createPostHandler, listPostsHandler } from "./handlers/postHandler";
import asyncHandler from "express-async-handler";

const app = express();

app.use(express.json());

const requestLoggerMiddleware: RequestHandler = (req, _, next) => {
  console.log(req.method, req.path, "- body:", req.body);
  next();
};

app.use(requestLoggerMiddleware);

app.get("/posts", asyncHandler(listPostsHandler));
// app.get("/posts", listPostsHandler);
app.post("/posts", asyncHandler(createPostHandler));

const errHanler: ErrorRequestHandler = (err, _, res, __) => {
  console.log("Uncaught exception", err);
  res.status(500).send("Oops, an unexpected error occured, please try again");
};
app.use(errHanler);

app.listen(3000);
