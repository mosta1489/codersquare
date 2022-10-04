import { User, Post, Comment, Like } from "../../types";
import { Datastore } from "..";

export class inMemoryDatastore implements Datastore {
  private user: User[] = [];
  private post: Post[] = [];
  private comment: Comment[] = [];
  private like: Like[] = [];

  createUser(user: User): void {
    this.user.push(user);
  }

  getUserByEmail(email: string): User | undefined {
    return this.user.find((u) => u.email === email);
  }

  getUserByUsername(username: string): User | undefined {
    return this.user.find((u) => u.username === username);
  }

  listPost(): Post[] {
    return this.post;
  }

  createPost(post: Post): void {
    this.post.push(post);
  }

  getPost(id: string): Post | undefined {
    return this.post.find((p) => p.id === id);
  }

  deletePost(id: string): void {
    const index = this.post.findIndex((p) => p.id === id);
    if (index === -1) {
      return;
    }
    this.post.splice(index, 1);
  }

  createComment(comment: Comment): void {
    this.comment.push(comment);
  }

  listComments(postId: string): Comment[] {
    return this.comment.filter((c) => c.postId === postId);
  }

  deleteComment(id: string): void {
    const index = this.comment.findIndex((c) => c.id === id);
    if (index === -1) {
      return;
    }
    this.comment.splice(index, 1);
  }

  createLike(like: Like): void {
    this.like.push(like);
  }
}
