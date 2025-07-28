const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ CORS: Allow specific origins for both local development and deployed frontend
// IMPORTANT: Replace 'https://your-frontend-vercel-url.vercel.app' with the actual URL
// where your frontend (the one that makes requests to this backend) is deployed on Vercel.
// Based on your error, it seems your frontend might also be deployed to 'https://suffah-final-project-github-io.vercel.app'.
app.use(cors({
  origin: [
    /^http:\/\/localhost:\d+$/, // Allows any localhost port for development
    'https://suffah-final-project-github-io.vercel.app' // Add your frontend's Vercel URL here
    // If your frontend is deployed to a different Vercel URL, add that one instead.
    // Example: 'https://your-actual-frontend-domain.vercel.app'
  ],
  credentials: true,
}));

// ✅ Middleware
app.use(express.json());

// ✅ Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// ✅ Serve static files (if your backend also serves a static frontend, which might not be the case here)
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

    // ✅ Safely List Routes
    try {
      const routes = app._router.stack
        .filter(layer => layer.route && layer.route.path)
        .map(layer => {
          const method = Object.keys(layer.route.methods).join(',').toUpperCase();
          const routePath = layer.route.path;
          return `${method} ${routePath}`;
        });

      console.log('📚 Registered routes:\n' + routes.join('\n'));
    } catch (err) {
      console.warn('⚠️ Could not list routes safely:', err.message || err);
    }

    // ✅ Start the server
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    const safeMessage = error?.stack || error?.message || 'Unknown MongoDB connection error';
    console.error('❌ MongoDB connection error:', safeMessage);
  });