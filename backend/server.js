const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ CORS: Allow localhost ports for React/Vite dev
app.use(cors({
  origin: [/^http:\/\/localhost:\d+$/],
  credentials: true,
}));

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
