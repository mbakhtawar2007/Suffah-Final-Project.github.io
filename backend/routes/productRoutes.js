const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Product = require('../models/Product');
const { authenticateToken, authorizeRoles } = require('../middleware/authMiddleware');
const { productValidator } = require('../middleware/validators');

// --------------------
// Multer config for image uploads
// --------------------
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '../public/uploads')),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
  fileFilter: (req, file, cb) => {
    const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (allowed.includes(file.mimetype)) cb(null, true);
    else cb(new Error('Only image files are allowed (jpeg, png, webp, gif).'));
  }
});

// --------------------
// GET all products
// --------------------
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    console.error('GET /api/products error:', err.message || err);
    res.status(500).json({ message: err.message || 'Internal Server Error' });
  }
});

// --------------------
// GET product by ID
// --------------------
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    console.error('GET /api/products/:id error:', err.message || err);
    res.status(500).json({ message: err.message || 'Internal Server Error' });
  }
});

// --------------------
// CREATE product (admin only)
// --------------------
router.post(
  '/',
  authenticateToken,
  authorizeRoles('admin'),
  upload.single('image'),
  ...productValidator,
  async (req, res) => {
    try {
      const { name, price, description, category } = req.body;
      const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

      const newProduct = new Product({ name, price, description, category, image: imageUrl });
      const savedProduct = await newProduct.save();
      res.status(201).json(savedProduct);
    } catch (err) {
      console.error('POST /api/products error:', err.message || err);
      res.status(400).json({ message: err.message });
    }
  }
);

// --------------------
// UPDATE product (admin only)
// --------------------
router.put(
  '/:id',
  authenticateToken,
  authorizeRoles('admin'),
  upload.single('image'),
  ...productValidator,
  async (req, res) => {
    try {
      const { name, price, description, category } = req.body;
      const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        { name, price, description, category, ...(imageUrl && { image: imageUrl }) },
        { new: true }
      );

      if (!updatedProduct) return res.status(404).json({ message: 'Product not found' });
      res.json(updatedProduct);
    } catch (err) {
      console.error('PUT /api/products/:id error:', err.message || err);
      res.status(400).json({ message: err.message });
    }
  }
);

// --------------------
// DELETE product (admin only)
// --------------------
router.delete(
  '/:id',
  authenticateToken,
  authorizeRoles('admin'),
  async (req, res) => {
    try {
      const deletedProduct = await Product.findByIdAndDelete(req.params.id);
      if (!deletedProduct) return res.status(404).json({ message: 'Product not found' });
      res.json({ message: 'Product deleted successfully' });
    } catch (err) {
      console.error('DELETE /api/products/:id error:', err.message || err);
      res.status(500).json({ message: err.message });
    }
  }
);

module.exports = router;
