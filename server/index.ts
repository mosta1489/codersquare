// RequestHandler is type of requesthandler or middleware
// ErrorRequestHandler is type of errorhandler (to build error handler middelware)
import express, { RequestHandler, ErrorRequestHandler } from "express";
import { createPostHandler, listPostsHandler } from "./handlers/postHandler";

// catch errors from async function to use my errorhandlers to save server form crash
// express can't catch errors from async/await func, so we import external module
import asyncHandler from "express-async-handler";
import { initDb } from "./datastore";

(async () => {
  await initDb();

  const app = express();

  app.use(express.json());

  const requestLoggerMiddleware: RequestHandler = (req, _, next) => {
    console.log(req.method, req.path, "- body:", req.body);
    next();
  };

  app.use(requestLoggerMiddleware);

  // wrap handler by asyncErrorHandler because there are async func
  app.get("/posts", asyncHandler(listPostsHandler));
  app.post("/posts", asyncHandler(createPostHandler));

  const errHanler: ErrorRequestHandler = (err, _, res, __) => {
    console.log("Uncaught exception", err);
    res.status(500).send("Oops, an unexpected error occured, please try again");
  };

  app.use(errHanler);

  app.listen(3000);
})();
