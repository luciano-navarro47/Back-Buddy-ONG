import { Request, Response, NextFunction } from 'express';
import { verifyToken, AuthTokenPayload } from '../../utils/jwt.utils';

export interface AuthRequest extends Request {
  user?: AuthTokenPayload;
}

export const authenticateJWT = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.cookies.jwt;

  if(!token) return res.status(401).json({ error: "Token not provided" });
  
  try {
    const payload = verifyToken(token);
    req.user = payload;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}