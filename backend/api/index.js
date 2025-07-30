const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const productRoutes = require('../routes/productRoutes'); // Path adjusted for index.js
const authRoutes = require('../routes/authRoutes');     // Path adjusted for index.js

const app = express();

// ✅ CORS for frontend access
app.use(cors({
  origin: [
    /^http:\/\/localhost:\d+$/, // For your local development (e.g., http://localhost:5173)
    'https://shopease-adminpanel.netlify.app', // Your Admin Panel Netlify URL
    'https://shopease-client-side.netlify.app',  // Your Client Side Netlify URL
    'https://suffah-final-project-github-io.vercel.app' // Add your main frontend Vercel URL
  ],
  credentials: true,
}));

// ✅ Middleware
app.use(express.json());

// ✅ Static files (optional, based on need)
// Paths need to be relative to where the Vercel build runs the file, which is usually the root of the backend folder.
// If 'public/uploads' is inside 'backend/', the path should be correct as '../public/uploads' relative to 'backend/api/'.
app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));
app.use(express.static(path.join(__dirname, '../public'))); // If you have other static assets in backend/public

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