// index.js
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const productRoutes = require('./routes/products');
app.use('/products', productRoutes);

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Error connecting to MongoDB:', error));

// Import Routes
const productRoutes = require('./routes/products');
app.use('/products', productRoutes);

// Start Server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
