
import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../../config';
import { User } from '../../models/user';

export async function loginController(req: Request, res: Response) {
  try{
  // Check for username and password
  const { user, password } = req.body;

  // If there is no username or password, then send a 400 response
  if (!user || !password) {
    return res.status(400).send({
      message: 'Username and password are required',
    });
  }

    // Check if user exists with the email
    const userModel = await User.findOne({ email: user });
  // If the user does not exist, then send a 401 response
  if (!userModel) {
    return res.status(401).send({
      message: 'Invalid username or password',
    });
  }

  // If the user exists, then check if the password is correct
  // using bcrypt and the user's salt

  // first hash the password using the user's salt
  const hash = bcrypt.hashSync(password, userModel.salt);
  // then compare the hash with the user's password
  const passwordIsValid = hash === userModel.password;

  // If the password is not valid, then send a 401 response
  if (!passwordIsValid) {
    return res.status(401).send({
      message: 'Invalid username or password',
    });
  }
  if (!config.jwt.secret) {
    return res.status(500).send({
      message: 'JWT secret is not defined',
    });
  }
  // If the password is valid, then generate a JWT
  const token = jwt.sign({ permission: userModel.permission }, config.jwt.secret, {
    expiresIn: '1h',
  });

  // Send the JWT in the response
  res.send({
    token,
  });

  } catch (err) {
    return res.status(401).send({
      message: 'Invalid username or password',
    });
  }

}
