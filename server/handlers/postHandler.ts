import { RequestHandler } from "express";
import { db } from "../datastore";

export const listPostsHandler: RequestHandler = async (_, res) => {
  res.send({ posts: await db.listPost() });
};

export const createPostHandler: RequestHandler = async (req, res) => {
  const post = req.body;
  if (!post.title || !post.url || !post.userId) {
    return res.sendStatus(400);
  }

  post["id"] = "123";
  post["postedAt"] = "123456";

  await db.createPost(post);
  res.status(200).send("post created successfully");
};
