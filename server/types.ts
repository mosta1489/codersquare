// RequestHandler is type of requesthandler or middleware
import { RequestHandler } from "express";

export interface User {
  id: string;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
}

export interface Post {
  id: string;
  title: string;
  url: string;
  userId: string;
  postedAt: number;
}

export interface Like {
  userId: string;
  postId: string;
}

export interface Comment {
  id: string;
  userId: string;
  postId: string;
  comment: string;
  postedAt: number;
}
type withError<T> = T & { error: string };
export type expressHandler<Req, Res> = RequestHandler<
  string,
  Partial<withError<Res>>,
  Partial<Req>
>;

export interface jwtObject {
  userId: string;
}
