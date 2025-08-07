const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

// ✅ CORS: Allow specific origins for local development and deployed frontends
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

// ✅ Serve static files (if you have any other public files at root)
app.use(express.static(path.join(__dirname, 'public')));

// ✅ API Routes - These prefixes are correct relative to the Express app's root
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

// ✅ Test routes
app.get('/', (req, res) => res.send('✅ API is working!'));
app.get('/api/test', (req, res) => res.json({ message: 'Test route is working 🚀' }));

// ❌ OLD: MongoDB Connection and Server Listen (for local execution)
// This entire section is for a traditional server and prevents Vercel from using your app.
/*
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    const safeMessage = error?.stack || error?.message || 'Unknown MongoDB connection error';
    console.error('❌ MongoDB connection error:', safeMessage);
  });
*/

// ✅ NEW: MongoDB Connection and Export
// Vercel's serverless functions connect to the database on each invocation.
// We need to establish the connection and then export the app.

// Vercel needs this part.
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch((error) => console.error('❌ MongoDB connection error:', error));

// Finally, you must export the Express app for Vercel.
module.exports = app;