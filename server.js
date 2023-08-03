const express = require('express')
const cors = require('cors'); // Import the cors middleware
const mongoose = require('mongoose'); // Import the mongoose module

const app = express();
const port= process.env.PORT || 5000;
require('dotenv').config()

// Serve static files from the public folder
app.use(express.static('public'));

// Handle the root route and serve the index.html file
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

//connect to databasea
async function connectDB(){ 
    try {
       await  mongoose.connect(process.env.MONGODB_URL);
    } catch (error) {
        console.log(error);
        throw error("Database connection failed");
    }
}

// import routes
const register = require('./routes/registerRoutes');
const login = require('./routes/loginRoutes')
const addUser = require('./routes/addUser')
const getUsers = require('./routes/getUsers')
const deleteUser = require('./routes/deleteUser');
const editUser = require('./routes/editUser')

async function main(){
    await connectDB();
    // Middleware to parse incoming JSON data
    app.use(express.json());
    app.use(cors()); // Use the cors middleware to enable CORS for all routes

    // Route to register a user
    app.use('/api/v1/',register)

    // Route to login a user
    app.use('/api/v1',login)

    // Route to add a new user
    app.use('/api/v1',addUser);

    // Route to get all user data
    app.use('/api/v1',getUsers);

    // Route to delete a user
    app.use('/api/v1',deleteUser);

    // Route to update a user
    app.use('/api/v1',editUser);

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


