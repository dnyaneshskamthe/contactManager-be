const mongoose = require('mongoose');

// Replace 'your_database_uri' with your actual MongoDB connection string
const databaseURI = '';
mongoose.connect(databaseURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));
