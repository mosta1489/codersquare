import { UserDao } from "./dao/UserDao";
import { PostDao } from "./dao/PostDao";
import { CommentDao } from "./dao/CommentDao";
import { LikeDao } from "./dao/LikeDao";
// import { inMemoryDatastore } from "./memorydb";
import { SqlDataStore } from "./sql";

export interface Datastore extends UserDao, PostDao, CommentDao, LikeDao {}

export let db: Datastore;

export async function initDb() {
  // db = new inMemoryDatastore();
  db = new SqlDataStore();
}
