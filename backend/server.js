const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ CORS: Allow specific origins for local development and Netlify deployments
app.use(cors({
  origin: [
    /^http:\/\/localhost:\d+$/, // For your local development (e.g., http://localhost:5173)
    'https://shopease-adminpanel.netlify.app', // Your Admin Panel Netlify URL
    'https://shopease-client-side.netlify.app'  // Your Client Side Netlify URL
  ],
  credentials: true,
}));

// The rest of your server.js remains the same:
// ✅ Middleware
app.use(express.json());

// ✅ Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// ✅ Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// ✅ API Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

// ✅ Test routes
app.get('/', (req, res) => res.send('✅ API is working!'));
app.get('/api/test', (req, res) => res.json({ message: 'Test route is working 🚀' }));

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');

    // ... (rest of your connection and server start logic)
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    const safeMessage = error?.stack || error?.message || 'Unknown MongoDB connection error';
    console.error('❌ MongoDB connection error:', safeMessage);
  });