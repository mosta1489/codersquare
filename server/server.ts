import express from "express";
// catch errors from async function to use my errorhandlers to save server form crash
// express can't catch errors from async/await func, so we import external module
import asyncHandler from "express-async-handler";

import { createPostHandler, listPostsHandler } from "./handlers/postHandler";
import { singInHandler, singUpHandler } from "./handlers/authHandler";
import { initDb } from "./datastore";
import { requestLoggerMiddleware } from "./middlewares/loggerMiddleware";
import { errHanler } from "./middlewares/errorMiddleware";
import { authMiddleware } from "./middlewares/authMiddleware";

(async () => {
  await initDb();

  const app = express();

  app.use(express.json());

  app.use(requestLoggerMiddleware);

  // wrap handler by asyncErrorHandler because there are async func
  // Public endpoints
  app.post("/v1/signup", asyncHandler(singUpHandler));
  app.post("/v1/signin", asyncHandler(singInHandler));

  app.use(authMiddleware);

  // Protected endpoint
  app.get("/v1/posts", asyncHandler(listPostsHandler));
  app.post("/v1/posts", asyncHandler(createPostHandler));

  app.use(errHanler);

  app.listen(3000);
})();
