const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const connectDB = require('./utils/db'); // New MongoDB connection util

const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

// ✅ Connect to MongoDB once (memoized)
connectDB();

// ✅ CORS: Allow specific origins
app.use(cors({
  origin: [
    /^http:\/\/localhost:\d+$/, 
    'https://shopease-adminpanel.netlify.app',
    'https://shopease-client-side.netlify.app',
    'https://suffah-final-project-github-io.vercel.app/'
  ],
  credentials: true,
}));

// ✅ Middleware
app.use(express.json());

// ✅ Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// ✅ Serve other static files
app.use(express.static(path.join(__dirname, 'public')));

// ✅ API Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

// ✅ Test routes
app.get('/', (req, res) => res.send('✅ API is working!'));
app.get('/api/test', (req, res) => res.json({ message: 'Test route is working 🚀' }));

// ✅ Export app for Vercel
module.exports = app;
