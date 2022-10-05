import { RequestHandler } from "express";
import { db } from "../datastore";

export const listPostsHandler: RequestHandler = (_, res) => {
  res.send({ posts: db.listPost() });
};

export const createPostHandler: RequestHandler = (req, res) => {
  const post = req.body;
  if (!post.title || !post.url || !post.userId) {
    return res.sendStatus(400);
  }

  post["id"] = "123";
  post["postedAt"] = "123456";

  db.createPost(post);
  res.status(200).send("post created successfully");
};
