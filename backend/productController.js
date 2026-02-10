const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getProducts = async (req, res) => {
    try {
        const { problemId } = req.query;
        const products = await prisma.product.findMany({
            where: problemId ? { problemId } : {},
            include: {
                problem: {
                    select: { title: true }
                },
                seller: {
                    select: {
                        profile: { select: { firstName: true } }
                    }
                }
            }
        });
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await prisma.product.findUnique({
            where: { id },
            include: {
                problem: {
                    select: { title: true, description: true }
                },
                seller: {
                    select: {
                        profile: { select: { firstName: true, avatarUrl: true, bio: true } }
                    }
                }
            }
        });
        if (!product) return res.status(404).json({ error: 'Product not found' });
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createProduct = async (req, res) => {
    try {
        const { name, description, price, demoUrl, downloadUrl, problemId } = req.body;
        const product = await prisma.product.create({
            data: {
                name,
                description,
                price: parseFloat(price),
                demoUrl,
                downloadUrl,
                problemId,
                sellerId: req.user.id
            }
        });
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getProducts, getProductById, createProduct };
