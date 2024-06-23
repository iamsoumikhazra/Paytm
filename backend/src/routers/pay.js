import express from 'express';
import jwt from 'jsonwebtoken';
import Transaction from '../models/db.transaction.js';
import User from '../models/users.model.js';
import { config } from "../config/config.js";

const usePay = express.Router();

// Middleware to authenticate the user
usePay.use((req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, config.jwtSecret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Failed to authenticate token' });
    }
    req.userId = decoded.userId;
    next();
  });
});

usePay.post('/', async (req, res) => {
  const { email, amount } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Recipient email is required' });
  }

  if (!amount || amount <= 0) {
    return res.status(400).json({ message: 'Valid amount is required' });
  }

  const session = await User.startSession();
  session.startTransaction();

  try {
    const sender = await User.findById(req.userId).session(session);
    if (!sender) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: 'Sender not found' });
    }

    const recipient = await User.findOne({ email }).session(session);
    if (!recipient) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: 'Recipient not found' });
    }

    // Check if sender has sufficient balance
    if (sender.balance < amount) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ message: 'Insufficient balance' });
    }

    // Deduct amount from sender's balance
    sender.balance -= amount;
    await sender.save({ session });

    // Add amount to recipient's balance
    recipient.balance += amount;
    await recipient.save({ session });

    const transaction = new Transaction({
      user: recipient._id,
      sender: sender._id,
      amount,
      date: new Date()
    });

    await transaction.save({ session });

    await session.commitTransaction();
    session.endSession();

    res.status(200).json({
      message: `Transaction successful! You have sent ₹${amount} to ${recipient.email}`,
      transaction
    });
  } catch (error) {
    console.error(error);
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ message: 'Server error', error });
  }
});

export default usePay;
