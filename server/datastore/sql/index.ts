import { Datastore } from "..";
import { User, Post, Comment, Like } from "../../types";
import DB from "./DB/connection";

export class SqlDataStore implements Datastore {
  async createUser(user: User): Promise<void> {
    const newUser: string[] = [];
    Object.entries(user).forEach(([_, value]) => {
      newUser.push(value);
    });

    await DB.query(
      "INSERT INTO users VALUES($1, $2, $3, $4, $5, $6) RETURNING *",
      newUser
    );
    return Promise.resolve();
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const user: User = await (
      await DB.query("SELECT * FROM users WHERE email=$1 ", [email])
    ).rows[0];
    return Promise.resolve(user);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const user: User = await (
      await DB.query("SELECT * FROM users WHERE username=$1 ", [username])
    ).rows[0];
    return Promise.resolve(user);
  }

  async listPost(): Promise<Post[]> {
    // throw new Error(`Method not implemented`);
    const posts: Post[] = (await DB.query("SELECT * FROM posts")).rows;

    return Promise.resolve(posts);
  }

  async createPost(post: Post): Promise<void> {
    const newPost: string[] = [];
    Object.entries(post).forEach(([_, value]) => {
      newPost.push(value);
    });

    await DB.query(
      "INSERT INTO posts VALUES($1, $2, $3, $4, $5) RETURNING *",
      newPost
    );

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
