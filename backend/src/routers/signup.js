import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/users.model.js';
import Transaction from '../models/db.transaction.js';
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

    // Generate a random amount between 1000 to 10000 rupees
    const initialBalance = Math.floor(Math.random() * 9000) + 1000;

    // Create a new user with initial balance
    const newUser = new User({ firstName, lastName, email, password, balance: initialBalance });
    await newUser.save();

    // Create a transaction record for initial balance
    const adminUser = await User.findOne({ role: 'admin' }); // Assuming 'admin' is a role assigned to the admin user
    if (!adminUser) {
      throw new Error('Admin user not found');
    }

    const transaction = new Transaction({
      user: newUser._id,
      sender: adminUser._id, // Set admin user as sender
      amount: initialBalance,
    });
    await transaction.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: newUser._id, email: newUser.email },
      config.jwtSecret,
      { expiresIn: '1h' } // Token expires in 1 hour
    );

    res.status(201).json({ message: 'User registered successfully', token: `Bearer ${token}` });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

export default signupRouter;
