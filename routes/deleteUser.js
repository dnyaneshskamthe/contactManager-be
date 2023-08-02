const express = require('express');
const router = express.Router();
const User = require('../model/User');

router.post('/api/v1/deleteUser', async (req, res) => {
  const { userId,id } = req.body;
  console.log(userId,id);

  try {
    console.log("delete request");
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
