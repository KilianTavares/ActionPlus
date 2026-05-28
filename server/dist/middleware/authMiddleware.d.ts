import { Request, Response, NextFunction } from "express";
interface AuthenticatedRequest extends Request {
    userId?: number;
}
declare function authMiddleware(req: AuthenticatedRequest, res: Response, next: NextFunction): void;
export default authMiddleware;
//# sourceMappingURL=authMiddleware.d.ts.map