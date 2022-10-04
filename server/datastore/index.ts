import { UserDao } from "./UserDao";
import { PostDao } from "./PostDao";
import { CommentDao } from "./CommentDao";
import { LikeDao } from "./LikeDao";
import { inMemoryDatastore } from "./memorydb";

export interface Datastore extends UserDao, PostDao, CommentDao, LikeDao {}

export const db = new inMemoryDatastore();
