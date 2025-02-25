import express from 'express';
import User from '../models/user.js';  
import bcryptjs from 'bcryptjs'; 

const router = express.Router();

// Sign-in API
router.post('/sign-in', async (req, res) => {
  try {
    const { username, email, password } = req.body; // Correct destructuring

    // Validate username length first
    if (!username || username.length < 4) {
      return res.status(400).json({ message: 'Username should have at least four characters' });
    }

    // Check if the user or email already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Hash the password
    const hashpass = await bcryptjs.hash(password, 10);

    // Create a new user
    const newUser = new User({ username, email, password: hashpass });
    await newUser.save();

    return res.status(200).json({ message: 'Sign-in successful!' });
  } catch (error) {
    console.error('Error in sign-in:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
