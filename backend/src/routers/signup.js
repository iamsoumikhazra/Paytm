import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/users.model.js';
import { validateSignup } from '../middlewares/userValidate.js';

import { config } from "../config/config.js";

const signupRouter = express.Router();

// Signup route with validation middleware
signupRouter.post('/', validateSignup, async (req, res) => {
  const { firstName, lastName, email, password } = req.validatedUser;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create a new user
    const newUser = new User({ firstName, lastName, email, password });
    await newUser.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: newUser._id, email: newUser.email },
      config.jwtSecret,
      { expiresIn: '1h' } // Token expires in 1 hour
    );

    res.status(201).json({ message: 'User registered successfully', token:`Bearer ${token}` });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

export default signupRouter;




