const express = require('express');
const router = express.Router();
const { createTransaction, getMyTransactions } = require('./transactionController');
const authMiddleware = require('./authMiddleware');

router.post('/buy', authMiddleware, createTransaction);
router.get('/my', authMiddleware, getMyTransactions);

module.exports = router;
