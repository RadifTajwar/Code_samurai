// Import the necessary modules for creating an Express app
const express = require('express');
const app = express();

const validator = require('validator');


// Import the error middleware, body parser, file upload, and dotenv for environment variables

const dotenv = require('dotenv');

// Load environment variables from the config file
dotenv.config({path: 'config/config.env'});
console.log(process.env.DB_URI);

// Use JSON parsing and extended URL encoding for request bodies
app.use(express.json());



// Import and use routes for different parts of the API

const user = require('./routes/userRoutes');
const book = require('./routes/bookRoutes')
app.use('/api/v1', user);
app.use('/api',book)
// Export the Express app for use in other parts of the application
module.exports = app;
