const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Product = require('../models/Product');
// Import both authenticateToken and authorizeRoles from the middleware
const { authenticateToken, authorizeRoles } = require('../middleware/authMiddleware');

// File upload config (no change needed here)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../public/uploads'));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// 📦 GET all products (public or authenticated, depending on your app's needs)
// If you want products to be viewable by anyone (public):
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// OR, if you want products to be viewable only by *any* authenticated user (regular or admin):
// router.get('/', authenticateToken, async (req, res) => { /* ... */ });


// 🔍 GET product by ID (public or authenticated)
// If you want a single product to be viewable by anyone (public):
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// OR, if you want a single product to be viewable only by *any* authenticated user:
// router.get('/:id', authenticateToken, async (req, res) => { /* ... */ });


// ➕ POST create product (protected - only 'admin' role)
router.post('/', authenticateToken, authorizeRoles('admin'), upload.single('image'), async (req, res) => {
  try {
    const { name, price, description, category } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const newProduct = new Product({
      name,
      price,
      description,
      category,
      image: imageUrl
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ✏️ PUT update product (protected - only 'admin' role)
router.put('/:id', authenticateToken, authorizeRoles('admin'), upload.single('image'), async (req, res) => {
  try {
    const { name, price, description, category } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name,
        price,
        description,
        category,
        ...(imageUrl && { image: imageUrl })
      },
      { new: true }
    );

    if (!updatedProduct) return res.status(404).json({ message: 'Product not found' });

    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// 🗑️ DELETE product (protected - only 'admin' role)
router.delete('/:id', authenticateToken, authorizeRoles('admin'), async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) return res.status(404).json({ message: 'Product not found' });

    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;