import { Router } from 'express';
import User from '../models/users.model.js';

const userRouter = Router();

userRouter.get('/', async(req, res) => {
  try{
  const users = await User.find();
  res.json(users.map(user => `${user.firstName} ${user.lastName}`));
  }
  catch(err){
    console.error(err)
    res.status(500).json({message: err.message}) 
  }
  })


export default userRouter