import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

interface AuthenticatedRequest extends Request {
  userId?: number;
}

function authMiddleware(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): void {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    res.status(401).json({ message: "No token provided" });
    return;
  }

  const token = authHeader.startsWith("Bearer ")
    ? authHeader.slice(7)
    : authHeader;

  jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded: any) => {
    if (err) {
      res.status(401).json({ message: "Invalid token" });
      return;
    }

    req.userId = decoded.id;
    next();
  });
}

export default authMiddleware;
