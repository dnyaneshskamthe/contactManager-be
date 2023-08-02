const express = require('express')
const cors=require('cors'); // Import the cors middleware
const mongoose=require('mongoose'); // Import the mongoose module

const app = express();
const port= process.env.PORT || 5000;
require('dotenv').config()

// Mock database to store users
let users = [];

//connect to databasea
async function connectDB(){ 
    try {
       await  mongoose.connect(process.env.MONGODB_URL);
    } catch (error) {
        console.log(error);
        throw error("Database connection failed");
    }
}

async function main(){
    await connectDB();
    // Middleware to parse incoming JSON data
    app.use(express.json());
    app.use(cors()); // Use the cors middleware to enable CORS for all routes

    // Route to add a new user
    app.use('/', require('./routes/addUser'));

    // Route to get all user data
    app.use('/',require('./routes/getUsers'));

    // Route to delete a user
    app.use('/',require('./routes/deleteUser'));

    // Route to update a user
    app.use('/',require('./routes/editUser'));

    // Start the server
    app.listen(port, () => {
        console.log(`Server is running on ${port}`);
    });

}

// app.post('/api/v1/addUser', (req, res) => {
//     console.log("user Added");
//   const { name, contact} = req.body;

//   // Basic validation - ensure name, email, and age are provided
//   if (!name || !contact) {
//     return res.status(400).json({ error: 'Please provide name & contact' });
//   }

//   // Generate a unique ID (for simplicity, we use the current timestamp)
//   const id = Date.now().toString();

//   // Create the new user object
//   const newUser = { id, name, contact };

//   // Add the user to the database (in this case, an array)
//   users.push(newUser);

//   return res.status(201).json(newUser);
// });
main();


