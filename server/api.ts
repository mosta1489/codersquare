/* eslint-disable @typescript-eslint/no-empty-interface */
import { Post, User } from "./types";

// Post APIs
export interface ListPostRequest {}
export interface ListPostResponse {
  posts: Post[];
}

export type CreatePostRequest = Pick<Post, "title" | "url" | "userId">;
export interface CreatePostResponse {}

export interface GetPostRequest {}
export interface GetPostResponse {
  post: Post;
}

// User APIs
export type SignupRequest = Pick<
  User,
  "firstname" | "lastname" | "username" | "email" | "password"
>;
export interface SignupResponse {
  jwt: string;
}
export interface SignInRequest {
  login: string; //username or email
  password: string;
}
export type SignInResponse = {
  user: Pick<User, "firstname" | "lastname" | "username" | "email" | "id">;
  jwt: string;
};
