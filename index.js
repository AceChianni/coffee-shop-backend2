// index.js

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const productRoutes = require('./routes/products');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const auth = require('./middleware/auth');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

// Serve static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Error connecting to MongoDB:', error));

// Default Route
app.get('/', (req, res) => {
  res.send('Welcome to the Coffee Shop');
});

// Routes
app.use('/auth', authRoutes); 
app.use('/users', auth, userRoutes); 
app.use('/products', auth, productRoutes); 

// Error handling middleware
app.use(errorHandler);

// Start Server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
