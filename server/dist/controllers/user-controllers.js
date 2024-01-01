import User from '../models/user.js';
import { hash, compare } from 'bcrypt';
import { createToken } from '../utils/token-manager.js';
export const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        return res.status(200).json({ message: 'OK', users });
    }
    catch (error) {
        return res.status(404).json({ Message: 'Error', cause: error.message });
        console.log(error);
    }
};
export const userSignup = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser)
            return res.status(401).send('User already registered');
        const hashedPassword = await hash(password, 10);
        const user = new User({ name, email, password: hashedPassword });
        await user.save();
        return res.status(201).json({ message: 'OK', id: user._id.toString() });
    }
    catch (error) {
        return res.status(404).json({ Message: 'Error', cause: error.message });
        console.log(error);
    }
};
export const userLogin = async (req, res, next) => {
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
        const token = createToken(existingUser._id.toString(), existingUser.email, '7d');
        return res
            .status(200)
            .json({ message: 'OK', id: existingUser._id.toString() });
    }
    catch (error) {
        return res.status(404).json({ Message: 'Error', cause: error.message });
        console.log(error);
    }
};
//# sourceMappingURL=user-controllers.js.map