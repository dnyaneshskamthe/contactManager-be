const express = require('express');
const router = express.Router();
const User = require('../model/User')

router.get('/api/v1/getUsers', async (req, res) => {
  // code to save the user to the database using Mongoose
  try {
    let userData= await User.find();
    return res.json(userData)
  } catch (error) {
    return res.status(400).json({message:'faild to fetch users'})
  } 
});

module.exports = router;
