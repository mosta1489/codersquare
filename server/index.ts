import express, { RequestHandler } from "express";
import { createPostHandler, listPostsHandler } from "./handlers/postHandler";

const app = express();

app.use(express.json());

const requestLoggerMiddleware: RequestHandler = (req, _, next) => {
  console.log(req.method, req.path, "- body:", req.body);
  next();
};

app.use(requestLoggerMiddleware);

app.get("/posts", listPostsHandler);
app.post("/posts", createPostHandler);

app.listen(3000);
