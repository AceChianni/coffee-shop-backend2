// // routes/products.js 

// const router = require('express').Router();
// const Product = require('../models/product');
// const upload = require('../middleware/upload');

// // Create a new product
// router.post('/', async (req, res) => {
//   try {
//     const product = new Product(req.body);
//     await product.save();
//     res.status(201).json(product);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });

// // Get all products or filter by category
// router.get('/', async (req, res) => {
//   try {
//     const { category } = req.query;
//     const filter = category ? { category } : {};
//     const products = await Product.find(filter);
//     res.json(products);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }

// });

// // Get a single product by ID
// router.get('/:id', async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);
//     if (!product) {
//       return res.status(404).json({ error: 'Product not found' });
//     }
//     res.json(product);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// // Update a product by ID
// router.put('/:id', async (req, res) => {
//   try {
//     const product = await Product.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true, runValidators: true }
//     );
//     if (!product) {
//       return res.status(404).json({ error: 'Product not found' });
//     }
//     res.json(product);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });

// // Delete a product by ID
// router.delete('/:id', async (req, res) => {
//   try {
//     const product = await Product.findByIdAndDelete(req.params.id);
//     if (!product) {
//       return res.status(404).json({ error: 'Product not found' });
//     }
//     res.json({ message: 'Product deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// module.exports = router;
const router = require('express').Router();
const { body, query, validationResult } = require('express-validator');
const Product = require('../models/product');

// Middleware for validating request body
const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Middleware for handling errors
const errorHandler = (error, req, res, next) => {
  res.status(error.status || 500).json({ error: error.message });
};

// Create a new product
router.post(
  '/',
  [
    body('name').isString().trim().notEmpty().withMessage('Name is required.'),
    body('price').isFloat({ gt: 0 }).withMessage('Price must be a positive number.'),
    body('category').isString().trim().notEmpty().withMessage('Category is required.'),
  ],
  validateRequest,
  async (req, res, next) => {
    try {
      const product = new Product(req.body);
      await product.save();
      res.status(201).json(product);
    } catch (error) {
      next(error);
    }
  }
);

// Get all products with pagination, filtering, and search
router.get(
  '/',
  [
    query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer.'),
    query('limit').optional().isInt({ min: 1 }).withMessage('Limit must be a positive integer.'),
    query('search').optional().isString().trim(),
  ],
  validateRequest,
  async (req, res, next) => {
    try {
      const { page = 1, limit = 10, category, search } = req.query;
      const filter = { deleted: { $ne: true } }; // Exclude soft-deleted products

      if (category) filter.category = category;
      if (search) filter.name = { $regex: search, $options: 'i' }; // Case-insensitive search

      const products = await Product.find(filter)
        .skip((page - 1) * limit)
        .limit(Number(limit));
      const total = await Product.countDocuments(filter);

      res.json({ total, page, limit, products });
    } catch (error) {
      next(error);
    }
  }
);

// Get a single product by ID
router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product || product.deleted) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    next(error);
  }
});

// Update a product by ID
router.put(
  '/:id',
  [
    body('name').optional().isString().trim(),
    body('price').optional().isFloat({ gt: 0 }),
    body('category').optional().isString().trim(),
  ],
  validateRequest,
  async (req, res, next) => {
    try {
      const product = await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      if (!product || product.deleted) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.json(product);
    } catch (error) {
      next(error);
    }
  }
);

// Soft delete a product by ID
router.delete('/:id', async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { deleted: true },
      { new: true }
    );
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json({ message: 'Product soft-deleted successfully', product });
  } catch (error) {
    next(error);
  }
});

// Apply error-handling middleware
router.use(errorHandler);

module.exports = router;
