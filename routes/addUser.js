const express = require('express');
const router = express.Router();
const User = require('../model/User')

router.post('/api/v1/addUser', async (req, res) => {
  const { name, contact } = req.body;
  // Basic validation - ensure name and contact are provided
  if (!name || !contact) {
    return res.status(400).json({ error: 'Please provide name and contact' });
  }

  // code to save the user to the database using Mongoose
  try {
    let newUser = new User({
        name : name,
        contact : contact
    }) 
    await newUser.save()
     // Respond with a success message or the saved user data
    return res.status(201).json({ message: 'User added successfully' });
  } catch (error) {
    return res.status(400).json({message:'faild to add user'})
  } 
});

module.exports = router;
