const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // ✅ Import cors
require('dotenv').config();

const productRoutes = require('./routes/productRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Use CORS middleware before routes
app.use(cors({
  origin: 'http://localhost:5173', // Allow Vite dev server
  credentials: true
}));

// Middleware
app.use(express.json());

// Routes
app.use('/api/products', productRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('API is working!');
});

// Additional test route for health check
app.get('/api/test', (req, res) => {
  res.json({ message: 'Test route is working' });
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error('MongoDB connection error:', err));
