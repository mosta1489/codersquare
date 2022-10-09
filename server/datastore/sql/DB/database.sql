-- Active: 1665282534186@@127.0.0.1@5432@codersquare
CREATE TABLE users (
    id         VARCHAR PRIMARY KEY,
    firstName  VARCHAR NOT NULL,
    lastName   VARCHAR NOT NULL,
    userName   VARCHAR UNIQUE NOT NULL,
    email      VARCHAR UNIQUE NOT NULL,
    password   VARCHAR NOT NULL
);

CREATE TABLE posts
(
  id        VARCHAR PRIMARY KEY,
  title     VARCHAR NOT NULL,
  url       VARCHAR UNIQUE NOT NULL,
  userId    VARCHAR NOT NULL,
  postAt    VARCHAR NOT NULL,
  Foreign Key (userid) REFERENCES users(id)
);