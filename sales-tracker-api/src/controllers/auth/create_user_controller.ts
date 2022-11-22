
import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import { User } from '../../models/user';

export async function createUserController(req: Request, res: Response) {
  try {
    // Get email and password from body
    const { email, password, permission, nome } = req.body;
    // Check if email and password are present
    if (!(email && password && permission && nome)) {
      return res.status(400).send({
        message: 'user, password and permission are required',
      });
    }
    // Check if user already exists
    const user = await User.findOne({ email });
    if (user) {
      return res.status(409).send({
        message: 'user already exists',
      });
    }
    // Hash the password
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    // Create user
    const newUser = await User.create({
      email,
      nome,
      password: hash,
      permission,
      salt,
    }); 

    // Send user in response without password and salt
    return res.status(201).send({
      id: newUser.id,
      email: newUser.email,
      nome: newUser.nome,
      permission: newUser.permission,
    });
   }
  catch (err) {
    return res.status(500).send({
      message: 'Error creating user',
    });
  }
}