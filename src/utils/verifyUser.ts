import jwt, { JwtPayload, VerifyErrors } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { errorHandler } from "./error";

const JWT_SECRET: string = process.env.JWT_SECRET || "your-own"; 

export interface AuthenticatedRequest extends Request {
  user?: string | JwtPayload;
}

export const verifyToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const token =
    req.cookies?.access_token ||
    (req.headers.authorization?.startsWith("Bearer")
      ? req.headers.authorization.split(" ")[1]
      : null);

  if (!token) {
    return next(errorHandler(401, "Unauthorized"));
  }

  jwt.verify(token, JWT_SECRET, (err: VerifyErrors | null, decoded: string | JwtPayload | undefined) => {
    if (err) return next(errorHandler(403, "Forbidden"));
    req.user = decoded;
    next();
  });
};
