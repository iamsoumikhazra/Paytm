import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

// Define the user schema
const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
});

// Hash password before saving to database
userSchema.pre('save', async function (next) {
  const user = this;
  if (!user.isModified('password')) return next();

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(user.password, saltRounds);
  user.password = hashedPassword;
  next();
});

// Create the user model
const User = mongoose.model('User', userSchema);

export default User;
