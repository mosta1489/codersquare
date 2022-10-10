/* eslint-disable @typescript-eslint/no-empty-interface */
import { Post } from "./types";

// Post APIs
export interface ListPostRequest {}
export interface ListPostResponse {
  post: Post[];
}

export type CreatePostRequest = Pick<Post, "title" | "url" | "userId">;
export interface CreatePostResponse {}

export interface GetPostRequest {}
export interface GetPostResponse {
  post: Post;
}
