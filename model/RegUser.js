const mongoose = require('mongoose');

// Define the user schema
const regUserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email : {
    type : String,
    required : true,
  },
  contact: {
    type: Number,
    required: true,
  },
  password : {
    type : String,
    requied : true
  },
  token: {
    type: String,
  },
});

// Create the user model using the schema
const RegUser = mongoose.model('RegUser', regUserSchema);

module.exports = RegUser;