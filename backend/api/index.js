const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const productRoutes = require('../routes/productRoutes');
const authRoutes = require('../routes/authRoutes');

const app = express();

// ✅ CORS for frontend access
app.use(cors({
  origin: [/^http:\/\/localhost:\d+$/, /^https:\/\/.*\.vercel\.app$/],
  credentials: true,
}));

// ✅ Middleware
app.use(express.json());

// ✅ Static files (optional, based on need)
app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));
app.use(express.static(path.join(__dirname, '../public')));

// ✅ API Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

// ✅ Test route
app.get('/', (req, res) => res.send('✅ API is working on Vercel!'));

// ✅ MongoDB connect (connect only once per cold start)
let isConnected = false;
async function connectToDB() {
  if (isConnected) return;
  await mongoose.connect(process.env.MONGO_URI);
  isConnected = true;
  console.log('✅ MongoDB connected');
}

// ✅ Vercel handler export
module.exports = async (req, res) => {
  await connectToDB();
  return app(req, res); // Pass request/response to Express
};
