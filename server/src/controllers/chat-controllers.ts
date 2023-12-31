import { Request, Response, NextFunction } from 'express';
import User from '../models/user.js';
import { configureOpenAI } from '../config/openai-config.js';
import { OpenAIApi, ChatCompletionRequestMessage } from 'openai';
import user from '../models/user.js';

export const generateChatCompletion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { message } = req.body;
  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) return res.status(401).json({ message: 'User not registered' });

    //then retrieve chats of the user
    const chats = user.chats.map(({ role, content }) => ({
      role,
      content,
    })) as ChatCompletionRequestMessage[];
    chats.push({ content: message, role: 'user' });
    user.chats.push({ content: message, role: 'user' });
    //send all chats with newly generated chat to OpenAI API
    const config = configureOpenAI();
    const openai = new OpenAIApi(config);

    //get latest response
    const chatRes = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: chats,
    });
    user.chats.push(chatRes.data.choices[0].message);
    await user.save();
    return res.status(200).json({ chats: user.chats });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Something went wrong!' });
  }
};

export const sendChatsToUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const existingUser = await User.findById(res.locals.jwtData.id);
    if (!existingUser) {
      return res.status(401).send('User not registered');
    }

    if (existingUser._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send('Permissions did not match');
    }

    return res.status(200).json({
      message: 'OK',
      chats: existingUser.chats,
    });
  } catch (error) {
    return res.status(404).json({ Message: 'Error', cause: error.message });
    console.log(error);
  }
};

export const deleteChats = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const existingUser = await User.findById(res.locals.jwtData.id);
    if (!existingUser) {
      return res.status(401).send('User not registered');
    }

    if (existingUser._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send('Permissions did not match');
    }
    //@ts-ignore
    existingUser.chats = [];
    await existingUser.save();
    return res.status(200).json({
      message: 'OK',
    });
  } catch (error) {
    return res.status(404).json({ Message: 'Error', cause: error.message });
    console.log(error);
  }
};
