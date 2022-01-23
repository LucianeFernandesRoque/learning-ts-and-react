import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface Ipayload {
  sub: string
}

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
  const authToken = request.headers.authorization;

  if (!authToken) {
    return response.status(401).json({
      errorCode: "token.invalid",
    });
  }

  const [, token] = authToken.split(" ")
  try {
    const { sub } = verify(token, process.env.JWT_SECRET) as Ipayload

    request.user_id = sub
    return next();
  } catch (err) {
    response.status(401).json({ errorCode: "token.expired" })
  }
}