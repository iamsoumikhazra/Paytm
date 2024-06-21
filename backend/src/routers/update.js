import { Router } from "express";
import User from '../models/users.model.js';
import { validateUpdate } from '../middlewares/userValidate.js';
import authenticate from '../middlewares/authenticate.js';

const updateRouter = Router();

updateRouter.put("/", authenticate, validateUpdate, async (req, res) => {
  const { firstName, lastName, email } = req.validatedUser;
  const userId = req.user.userId; // Get userId from the authenticated user
  

  try {
    // Check if the user exists
    const existingUser = await User.findById(userId);
    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update user details
    existingUser.firstName = firstName || existingUser.firstName;
    existingUser.lastName = lastName || existingUser.lastName;
    existingUser.email = email || existingUser.email;

    await existingUser.save();

    res.status(200).json({ message: 'User updated successfully', user: existingUser, existingUser });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

export default updateRouter;
