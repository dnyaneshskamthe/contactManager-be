const express = require('express');
const router = express.Router();
const User = require('../model/User');
const checkAuth = require('../middleware/checkAuth')

router.post('/editUser',checkAuth, async (req, res) => {
  const { id, name, contact } = req.body;
  console.log(req.headers);

  try {
    // Find the existing user by ID
    const existingUser = await User.findById(id);

    // If the user with the specified ID doesn't exist, return an error
    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update the user's information
    existingUser.name = name;
    existingUser.contact = contact;

    // Save the updated user to the database
    await existingUser.save();

    // Respond with a success message or the updated user data
    return res.status(200).json({ message: 'User updated successfully', user: existingUser });
  } catch (error) {
    console.error('Error updating user:', error);
    return res.status(500).json({ message: 'Failed to update user' });
  }
});

module.exports = router;