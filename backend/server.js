// backend/server.js
const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const connectDB = require('./utils/db');
const productRoutes = require('./routes/productRoutes');
const authRoutes    = require('./routes/authRoutes');

const app = express();

// 1️⃣ Connect to MongoDB (memoized)
connectDB().catch(err => {
  // If DB connection fails, we let Vercel crash the function and log the error
  console.error('Fatal DB error, exiting:', err);
  process.exit(1);
});

// 2️⃣ CORS
// server.js
app.use(cors({
  origin: [
    /^http:\/\/localhost:\d+$/,
    'https://shopease-adminpanel.netlify.app',
    'https://shopease-client-side.netlify.app',
    'https://shopease-client-side.netlify.app/products',
    'https://suffah-final-project-github-io.vercel.app'
  ],
  credentials: true,
}));

// 3️⃣ Middleware
app.use(express.json());

// 4️⃣ Static serving
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));
app.use(express.static(path.join(__dirname, 'public')));

// 5️⃣ API routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

// 6️⃣ Test routes
app.get('/',       (req, res) => res.send('✅ API is working!'));
app.get('/api/test',(req, res) => res.json({ message: 'Test route is working 🚀' }));

// 7️⃣ Global error handler (so uncaught errors get logged nicely)
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

// 8️⃣ Export for Vercel
module.exports = app;

// 9️⃣ Add this block for local development
const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
  });
}