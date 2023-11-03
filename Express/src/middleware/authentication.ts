// middleware/authentication.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config/jwtConfig';

export default function authenticateToken(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  console.log('JWT Secret:', config.jwtSecret);

  if (token == null) {
    res.sendStatus(401);
    return;
  }

  jwt.verify(token, config.jwtSecret, (err, user) => {
    console.log(err);

    if (err) {
      res.sendStatus(403);
      return;
    }

    // Assign user to the request object
    (req as any).user = user;

    next();
  });
}
