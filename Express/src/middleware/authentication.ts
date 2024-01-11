// middleware/authentication.ts
import { Response, NextFunction } from 'express';
import jwt, {  JwtPayload } from 'jsonwebtoken';
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

    req.user = { userId: decoded['userId'] };
    next();
  } catch (error:any) {
    if (error.name === 'TokenExpiredError') {
      res.status(403).json({ error: 'Forbidden', message: 'Token expired' });
      return;
    } 
    if (error.name === 'NotBeforeError') {
      res.status(403).json({ error: 'Forbidden', message: 'Token not valid yet' });
      return;
    } 
    console.error('Error during token verification:', error);
    res.status(500).json({ error: 'Internal Server Error', message: 'Error during token verification' });
    return;
  }
}
