// ErrorRequestHandler is type of errorhandler (to build error handler middelware)
import { ErrorRequestHandler } from "express";

export const errHanler: ErrorRequestHandler = (err, _, res, __) => {
  console.log("Uncaught exception", err);
  res.status(500).send("Oops, an unexpected error occured, please try again");
};
