import express from 'express';
import User from '../models/user.js';  
import bcryptjs from 'bcryptjs'; 
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// Function to generate tokens
const generateTokens = (user) => {
  const accessToken = jwt.sign(
    { userId: user._id, username: user.username },
    process.env.JWT_SECRET || "defaultSecret",
    { expiresIn: '15m' } // Short expiration for security
  );

  const refreshToken = jwt.sign(
    { userId: user._id },
    process.env.REFRESH_SECRET || "defaultRefreshSecret", // Add REFRESH_SECRET to .env
    { expiresIn: '7d' } // Refresh token lasts longer
  );

  return { accessToken, refreshToken };
};

// Sign-up API
router.post('/sign-in', async (req, res) => {
  try {
    const { username, email, password } = req.body; 

    if (!username || username.length < 4) {
      return res.status(400).json({ message: 'Username should have at least four characters' });
    }

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

    return res.status(201).json({ message: 'User registered successfully!' });
  } catch (error) {
    console.error('Error in sign-up:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Login API
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username });
    if (!existingUser) {
      return res.status(400).json({ message: "Username or password is incorrect" });
    }

    const isPasswordValid = await bcryptjs.compare(password, existingUser.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate tokens
    const { accessToken, refreshToken } = generateTokens(existingUser);

    res.status(200).json({
      id: existingUser._id,
      accessToken,
      refreshToken
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Refresh Token API
router.post("/refresh-token", async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(401).json({ message: "Refresh Token Required" });
    }

    jwt.verify(refreshToken, process.env.REFRESH_SECRET, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Invalid Refresh Token" });
      }

      const newAccessToken = jwt.sign(
        { userId: decoded.userId },
        process.env.JWT_SECRET,
        { expiresIn: '15m' }
      );

      res.status(200).json({ accessToken: newAccessToken });
    });
  } catch (error) {
    console.error("Refresh Token Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
