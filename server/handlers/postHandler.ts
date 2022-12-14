import { expressHandler, Post } from "../types";
import { db } from "../datastore";
import {
  CreatePostRequest,
  CreatePostResponse,
  ListPostRequest,
  ListPostResponse,
} from "../api";
import crypto from "crypto";

export const listPostsHandler: expressHandler<
  ListPostRequest,
  ListPostResponse
> = async (_, res) => {
  const posts: Post[] = await db.listPost();
  return res.send({ posts });
};

export const createPostHandler: expressHandler<
  CreatePostRequest,
  CreatePostResponse
> = async (req, res) => {
  if (!req.body.title || !req.body.url) {
    return res.sendStatus(400);
  }

  const post: Post = {
    id: crypto.randomUUID(),
    title: req.body.title,
    url: req.body.url,
    //==============
    userId: res.locals.userId,
    //==============

    postedAt: Date.now(),
  };
  await db.createPost(post);
  res.sendStatus(200);
};
