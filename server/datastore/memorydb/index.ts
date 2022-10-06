import { User, Post, Comment, Like } from "../../types";
import { Datastore } from "..";

export class inMemoryDatastore implements Datastore {
  private user: User[] = [];
  private post: Post[] = [];
  private comment: Comment[] = [];
  private like: Like[] = [];

  createUser(user: User): Promise<void> {
    this.user.push(user);
    return Promise.resolve();
  }

  getUserByEmail(email: string): Promise<User | undefined> {
    return Promise.resolve(this.user.find(u => u.email === email));
  }

  getUserByUsername(username: string): Promise<User | undefined> {
    return Promise.resolve(this.user.find(u => u.username === username));
  }

  listPost(): Promise<Post[]> {
    return Promise.resolve(this.post);
  }

  createPost(post: Post): Promise<void> {
    this.post.push(post);
    return Promise.resolve();
  }

  getPost(id: string): Promise<Post | undefined> {
    return Promise.resolve(this.post.find(p => p.id === id));
  }

  deletePost(id: string): Promise<void> {
    const index = this.post.findIndex(p => p.id === id);
    if (index === -1) {
      return Promise.resolve();
    }
    this.post.splice(index, 1);
    return Promise.resolve();
  }

  createComment(comment: Comment): Promise<void> {
    this.comment.push(comment);
    return Promise.resolve();
  }

  listComments(postId: string): Promise<Comment[]> {
    return Promise.resolve(this.comment.filter(c => c.postId === postId));
  }

  deleteComment(id: string): Promise<void> {
    const index = this.comment.findIndex(c => c.id === id);
    if (index === -1) {
      return Promise.resolve();
    }
    this.comment.splice(index, 1);
    return Promise.resolve();
  }

  createLike(like: Like): Promise<void> {
    this.like.push(like);
    return Promise.resolve();
  }
}
