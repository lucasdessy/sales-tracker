
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../../config';
export function authController(req: Request, res: Response, next: NextFunction) {
  try{
  // Check for token
    let undecodedToken = req.headers.authorization;
    // If start with Bearer, then remove it
    undecodedToken =
      undecodedToken?.startsWith('Bearer ')
        ? undecodedToken.slice(7, undecodedToken.length)
        : undecodedToken;


  // If there is no token, then send a 401 response
  if (!undecodedToken) {
    return res.status(401).send({
      message: 'No token provided',
    });
  }
  // if there is no secret, status 500
  if (!config.jwt.secret) {
    return res.status(500).send({
      message: 'JWT secret is not defined',
    });
  }

  // If there is a token, then verify it
  const token = jwt.verify(undecodedToken, config.jwt.secret);

  // If the token is invalid, then send a 401 response
  if (!token) {
    console.log('token invalido');
    return res.status(401).send({
      message: 'Invalid token',
    });
  }

  // If the token is valid, then call next()
    next();
  } catch (err) {
    console.log('token invalido', err);
    return res.status(401).send({
      message: 'Invalid token',
    });
  }
}