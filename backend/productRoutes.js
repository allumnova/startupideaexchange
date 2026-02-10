const express = require('express');
const router = express.Router();
const { getProducts, getProductById, createProduct } = require('./productController');
const authMiddleware = require('./authMiddleware');

router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', authMiddleware, createProduct);

module.exports = router;
