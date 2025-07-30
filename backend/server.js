const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 5000; // Ensure PORT is correctly picked up or defaults to 5000

// ✅ CORS: Allow specific origins for local development and deployed frontends
app.use(cors({
  origin: [
    /^http:\/\/localhost:\d+$/, // For your local development (e.g., http://localhost:5173, 5174 etc.)
    'https://shopease-adminpanel.netlify.app',
    'https://shopease-client-side.netlify.app',
    'https://suffah-final-project-github-io.vercel.app' // Add your main frontend Vercel URL
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

// ✅ MongoDB Connection and Server Listen (for local execution)
// THIS PART MUST BE UNCOMMENTED FOR YOUR LOCAL BACKEND TO WORK
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`); // This message will now appear!
    });
  })
  .catch((error) => {
    const safeMessage = error?.stack || error?.message || 'Unknown MongoDB connection error';
    console.error('❌ MongoDB connection error:', safeMessage);
  });