import { jwtObject } from "./types";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    console.log("Missing JWT secret");
    process.exit(1);
  }
  return secret;
}

export function signJwt(obj: jwtObject): string {
  return jwt.sign(obj, getJwtSecret());
}

export function verifyJwt(token: string): jwtObject {
  return jwt.verify(token, getJwtSecret()) as jwtObject;
}
