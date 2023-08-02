const express = require('express');
const router = express.Router();
const RegUser = require('../model/RegUser')

router.post('/api/v1/register', async (req, res) => {
  const { name, email, contact, password } = req.body;
  console.log(name,email,contact,password);
  // Basic validation - ensure name and contact are provided
  if (!name || !email || !contact || !password) {
    return res.status(400).json({ error: 'Please provide all details' });
  }

  // code to save the user to the database using Mongoose
  try {
    let newUser = new RegUser({
        name : name,
        email : email,
        contact : contact,
        password : password
    }) 
    await newUser.save()
     // Respond with a success message or the saved user data
    return res.status(201).json({ message: 'User added successfully' });
  } catch (error) {
    return res.status(400).json({message:'faild to add user'})
  } 
});

module.exports = router;
