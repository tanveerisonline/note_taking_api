const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./src/utils/db');
const basicAuth = require('express-basic-auth');
const noteRoutes = require('./src/routes/noteRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(bodyParser.json());

// Basic Authentication
app.use(
  basicAuth({
    users: { admin: 'adminpassword' },
    challenge: true,
  })
);

// API Routes
app.use('/api', noteRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
