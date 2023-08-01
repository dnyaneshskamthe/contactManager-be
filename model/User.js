const mongoose = require('mongoose');

// Define the user schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  contact: {
    type: Number,
    required: true,
  },
});

// Create the user model using the schema
const User = mongoose.model('User', userSchema);

module.exports = User;