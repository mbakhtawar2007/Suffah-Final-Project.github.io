// backend/controllers/productsController.js
const Product = require('../models/Product');

exports.deleteProduct = async (req, res) => {
  try {
    // Only an admin can delete a product
     //if(req.user.role !== 'admin') {
     // return res.status(403).json({ message: 'Unauthorized' });
     //}

    const productId = req.params.id;
    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};