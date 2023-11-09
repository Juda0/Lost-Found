// middleware/authentication.ts
import { Request, Response, NextFunction } from 'express';
import jwt, { VerifyErrors, JwtPayload } from 'jsonwebtoken';
import { promisify } from 'util';
import config from '../config/jwtConfig';
import { IAuthenticatedRequest } from '../interfaces/middleware/IAuthenticatedRequest';

const verifyToken = promisify(jwt.verify) as (token: string, secret: string) => Promise<JwtPayload>;

export default async function authenticateToken(req: IAuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    res.status(401).json({ error: 'Unauthorized', message: 'Token not provided' });
    return;
  }

  try {
    const decoded = await verifyToken(token, config.jwtSecret);

    if (!decoded) {
      res.status(403).json({ error: 'Forbidden', message: 'Invalid token' });
      return;
    }

    req.user = { userId: decoded.userId };
    next();
  } catch (error) {
    console.error('Error during token verification:', error);
    res.status(500).json({ error: 'Internal Server Error', message: 'Error during token verification' });
  }
}
