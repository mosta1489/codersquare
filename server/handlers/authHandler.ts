import { expressHandler, User } from "../types";
import { db } from "../datastore";

import { SignInResponse, SignupRequest, SignupResponse } from "../api";

import crypto from "crypto";
import { SignInRequest } from "../api";
import { signJwt } from "./../auth";

// signup handler
export const singUpHandler: expressHandler<
  SignupRequest,
  SignupResponse
> = async (req, res) => {
  const { firstname, lastname, username, email, password } = req.body;
  if (!firstname || !lastname || !username || !email || !password) {
    return res.status(400).send({ error: "all fields are required" });
  }

  const existing =
    (await db.getUserByEmail(email)) || (await db.getUserByUsername(username));
  if (existing) {
    return res.status(403).send({ error: "user already exists" });
  }

  const user: User = {
    id: crypto.randomUUID(),
    firstname,
    lastname,
    username,
    email,
    password,
  };
  const jwt = signJwt({ userId: user.id });
  await db.createUser(user);
  return res.status(200).send({ jwt });
};

export const singInHandler: expressHandler<
  SignInRequest,
  SignInResponse
> = async (req, res) => {
  const { login, password } = req.body;
  if (!login || !password) {
    return res
      .status(400)
      .send({ error: "missing values username or password" });
  }

  const existing =
    (await db.getUserByEmail(login)) || (await db.getUserByUsername(login));
  if (!existing || existing.password !== password) {
    return res.status(403).send({ error: "incorrect username or password" });
  }

  const jwt = signJwt({ userId: existing.id });

  return res.status(200).send({
    user: {
      email: existing.email,
      firstname: existing.firstname,
      lastname: existing.lastname,
      username: existing.username,
      id: existing.id,
    },
    jwt: jwt,
  });
};
