import { z } from 'zod';

// Define the user signup schema
const signupSchema = z.object({
  firstName: z.string().min(1, "First Name is required"),
  lastName: z.string().min(1, "Last Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

// Define the user signin schema
const signinSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

// Middleware function for validating signup data
const validateSignup = (req, res, next) => {
  const result = signupSchema.safeParse(req.body);

  if (!result.success) {
    const errors = result.error.errors.map(err => err.message);
    return res.status(400).json({ errors });
  }

  req.validatedUser = result.data; // Attach validated user data to the request object
  next();
};

// Middleware function for validating signin data
const validateSignin = (req, res, next) => {
  const result = signinSchema.safeParse(req.body);

  if (!result.success) {
    const errors = result.error.errors.map(err => err.message);
    return res.status(400).json({ errors });
  }

  req.validatedUser = result.data; // Attach validated user data to the request object
  next();
};

export { validateSignup, validateSignin };
