import { NextFunction, Response, Request } from "express";

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  return res.status(500).send("Something broke!");
}
