import express, { RequestHandler } from "express";

import { db } from "./datastore";
const app = express();
app.use(express.json());
const requestLoggerMiddleware: RequestHandler = (req, _, next) => {
  console.log(req.method, req.path, "- body:", req.body);
  next();
};
app.use(requestLoggerMiddleware);

app.get("/posts", (_, res) => {
  res.send({ posts: db.listPost() });
});

app.post("/posts", (req, res) => {
  const post = req.body;
  db.createPost(post);
  res.status(200).send("post created successfully");
});

app.listen(3000);
