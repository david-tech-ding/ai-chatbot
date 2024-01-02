import { NextFunction, Request, Response, Router } from 'express';
import User from '../models/user.js';
import { hash, compare } from 'bcrypt';
import { createToken } from '../utils/token-manager.js';
import { COOKIE_NAME } from '../utils/constants.js';

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.find();
    return res.status(200).json({ message: 'OK', users });
  } catch (error) {
    return res.status(404).json({ Message: 'Error', cause: error.message });
    console.log(error);
  }
};

export const userSignup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(401).send('User already registered');
    const hashedPassword = await hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    //create tokens, store cookies
    res.clearCookie(COOKIE_NAME, {
      path: '/',
      httpOnly: true,
      domain: 'localhost',
      signed: true,
    });

    const token = createToken(
      existingUser._id.toString(),
      existingUser.email,
      '7d'
    );
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    res.cookie(COOKIE_NAME, token, {
      path: '/',
      domain: 'localhost',
      expires,
      httpOnly: true,
      signed: true,
    });

    return res.status(201).json({
      message: 'OK',
      name: existingUser.name,
      email: existingUser.email,
    });
  } catch (error) {
    return res.status(404).json({ Message: 'Error', cause: error.message });
    console.log(error);
  }
};

export const userLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(401).send('User not registered');
    }
    const isPasswordCorrect = await compare(password, existingUser.password);
    if (!isPasswordCorrect) {
      return res.status(403).send('Password is incorrect');
    }
    //create tokens, store cookies
    res.clearCookie(COOKIE_NAME, {
      path: '/',
      httpOnly: true,
      domain: 'localhost',
      signed: true,
    });

    const token = createToken(
      existingUser._id.toString(),
      existingUser.email,
      '7d'
    );
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    res.cookie(COOKIE_NAME, token, {
      path: '/',
      domain: 'localhost',
      expires,
      httpOnly: true,
      signed: true,
    });

    return res.status(200).json({
      message: 'OK',
      name: existingUser.name,
      email: existingUser.email,
    });
  } catch (error) {
    return res.status(404).json({ Message: 'Error', cause: error.message });
    console.log(error);
  }
};
