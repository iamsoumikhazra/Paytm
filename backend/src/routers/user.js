import { Router } from "express";
import User from '../models/users.model.js';
import authenticate from '../middlewares/authenticate.js';

const userRouter = Router();

userRouter.get("/", authenticate, async (req, res) => {
  try {
    const userId = req.user.userId; // Assuming req.user contains the decoded token with userId
    const user = await User.findById(userId).select('-password'); // Exclude the password field
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

export default userRouter;
