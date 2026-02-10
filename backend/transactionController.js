const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createTransaction = async (req, res) => {
    try {
        const { productId } = req.body;
        const buyerId = req.user.id;

        const product = await prisma.product.findUnique({
            where: { id: productId }
        });

        if (!product) return res.status(404).json({ error: 'Product not found' });

        // Create a transaction record
        const transaction = await prisma.transaction.create({
            data: {
                amount: product.price,
                currency: 'INR',
                status: 'COMPLETED', // Mocking completion for now
                buyerId,
                productId
            }
        });

        res.status(201).json({ message: 'Purchase successful', transaction });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getMyTransactions = async (req, res) => {
    try {
        const transactions = await prisma.transaction.findMany({
            where: { buyerId: req.user.id },
            include: {
                product: true
            }
        });
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { createTransaction, getMyTransactions };
