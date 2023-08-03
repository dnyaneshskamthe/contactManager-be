const express = require('express');
const router = express.Router();
const User = require('../model/User');
const checkAuth = require('../middleware/checkAuth')
router.post('/deleteUser',checkAuth, async (req, res) => {
  const { userId,id } = req.body;

  try {
    const result = await User.deleteOne({
      _id: id,
    });

    if (result.deletedCount === 0) {
      // If deletedCount is 0, it means no matching user was found
      return res.status(404).json({ message: 'User not found' });
    }

    // If deletedCount is greater than 0, it means a user was successfully deleted
    return res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    return res.status(500).json({ message: 'Failed to delete user' });
  }
});

module.exports = router;
