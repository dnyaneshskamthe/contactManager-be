const mongoose = require('mongoose');
const RegUser = require('./RegUser')

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
  owner : {
    type : mongoose.Schema.ObjectId,
    ref : RegUser,
    require : true
  }
});

// Create the user model using the schema
const User = mongoose.model('User', userSchema);

module.exports = User;