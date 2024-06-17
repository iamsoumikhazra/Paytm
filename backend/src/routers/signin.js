import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/users.model.js';
import { validateSignin } from '../middlewares/userValidate.js';
import { config } from "../config/config.js";

const signinRouter = express.Router();

// Signin route with validation middleware
signinRouter.post('/signin', validateSignin, async (req, res) => {
  const { email, password } = req.validatedUser;

  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      config.jwtSecret,
      { expiresIn: '1h' } // Token expires in 1 hour
    );

    res.status(200).json({ message: 'Signin successful', token: `Bearer ${token}` });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

export default signinRouter;
