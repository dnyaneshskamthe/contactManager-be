const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const RegUser = require('../model/RegUser');

router.post('/api/v1/login', async (req, res) => {
  const { email, password } = req.body;

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

    // Respond with a success message or the user data
    return res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to perform login' });
  }
});

module.exports = router;
