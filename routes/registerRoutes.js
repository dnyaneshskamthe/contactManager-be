const express = require('express');
const router = express.Router();
const RegUser = require('../model/RegUser');
const bcrypt = require('bcrypt');
const saltRounds = 10; // for bcrypting password

router.post('/api/v1/register', async (req, res) => {
  const { name, email, contact, password } = req.body;

  // Basic validation - ensure name, email, contact, and password are provided
  if (!name || !email || !contact || !password) {
    return res.status(400).json({ error: 'Please provide all details' });
  }

  // Hash the password using bcrypt
  try {
    bcrypt.hash(password, saltRounds, async function (err, hash) {
      if (err) {
        return res.status(500).json({ message: 'Failed to hash password' });
      }

      // Create a new user with the hashed password
      let newUser = new RegUser({
        name: name,
        email: email,
        contact: contact,
        password: hash,
      });

      // Save the user to the database
      await newUser.save();

      // Respond with a success message
      return res.status(201).json({ message: 'User added successfully' });
    });
  } catch (error) {
    return res.status(400).json({ message: 'Failed to add user' });
  }
});

module.exports = router;
