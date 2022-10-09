import { Datastore } from "..";
import { User, Post, Comment, Like } from "../../types";
import DB from "./DB/connection";

export class SqlDataStore implements Datastore {
  createUser(user: User): Promise<void> {
    throw new Error(`Method not implemented. ${user}`);
    // DB.query("INSERT INTO user");
  }
  getUserByEmail(email: string): Promise<User | undefined> {
    throw new Error(`Method not implemented. ${email}`);
  }
  getUserByUsername(username: string): Promise<User | undefined> {
    throw new Error(`Method not implemented. ${username}`);
  }
  async listPost(): Promise<Post[]> {
    // throw new Error(`Method not implemented`);
    const posts: Post[] = (await DB.query("SELECT * FROM posts")).rows;

    return Promise.resolve(posts);
  }
  createPost(post: Post): Promise<void> {
    const newPost: string[] = [];
    Object.entries(post).forEach(([_, value]) => {
      newPost.push(value);
    });

    DB.query("INSERT INTO posts VALUES($1, $2, $3, $4, $5)", newPost);
    return Promise.resolve();
  }
  async getPost(id: string): Promise<Post | undefined> {
    const post: Post = await (
      await DB.query("SELECT * FROM posts WERE postId = $1", [id])
    ).rows[0];
    return Promise.resolve(post);
  }

  deletePost(id: string): Promise<void> {
    throw new Error(`Method not implemented. ${id}`);
  }
  createComment(comment: Comment): Promise<void> {
    throw new Error(`Method not implemented.  ${comment}`);
  }
  listComments(postId: string): Promise<Comment[]> {
    throw new Error(`Method not implemented. ${postId}`);
  }
  deleteComment(id: string): Promise<void> {
    throw new Error(`Method not implemented. ${id}`);
  }
  createLike(like: Like): Promise<void> {
    throw new Error(`Method not implemented. ${like}`);
  }
}
