// controllers/postController.js
const bcrypt = require('bcrypt');
const { User } = require('../models');
const jwt = require('jsonwebtoken');
const config = require('../jwtconfig'); // Inject the configuration service

function generateAccessToken(userId) {
  return jwt.sign(userId, config.jwtSecret, { expiresIn: '1800s' });
}

// Controller functions
const register = async (req, res) => {
  try {
    const { username, email, password } = req.body

    // Check if the user already exists
    const userExists = await User.findOne({ where: { email } });

    if (userExists) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); // salt rounds (10)

    // Create a new user
    await User.create({ username, email, password: hashedPassword });

   res.status(201).json({ message: 'User sucessfully Registered' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to register' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find the user by email
    const user = await User.findOne({ where: { email } });

    if (!user) {
       return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Compare hashed password with hashed provided password
    const passwordMatch  = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      // Generate JWT token
      const token = generateAccessToken({ userId: user.id });

      // Return a success response indicating a JWTtoken.
      res.status(200).json({ message: 'Successfully logged in', token});
    } else {
      res.status(401).json({ error: 'Invalid email or password' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to login' });
  }
};



module.exports = {
  // Add more controller functions as needed
  login,
  register
};