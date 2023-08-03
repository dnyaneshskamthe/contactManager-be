const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const RegUser = require('../model/RegUser');
const jwt = require('jsonwebtoken'); // Import jsonwebtoken library

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);

  // Basic validation - ensure email and password are provided
  if (!email || !password) {
    return res.status(400).json({ error: 'Please provide email and password' });
  }

  // Code to find the user in the database using Mongoose
  try {
    const user = await RegUser.findOne({ email });

    // Check if the user exists and the password matches
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Create a payload for the JWT containing user data
    const payload = {
      id: user._id,
      email: user.email,
      name: user.name,
    };
     // Sign the JWT with the payload and a secret key
     const secretKey = process.env.JWT_SECRET_KEY; // Replace this with your own secret key
     const token = jwt.sign(payload, secretKey); // Set expiration time if needed
     const userId = user._id;

    // Respond with a success message or the user data
    return res.status(200).json({ message: 'Login successful', token,userId});
  } catch (error) {
    return res.status(500).json({ message: 'Failed to perform login' });
  }
});

module.exports = router;
