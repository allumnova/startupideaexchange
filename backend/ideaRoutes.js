const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const authMiddleware = require('./authMiddleware');

const prisma = new PrismaClient();

// Create Idea (Protected)
router.post('/', authMiddleware, async (req, res) => {
    try {
        const { title, description, category, stage, equityOffer, tags } = req.body;
        const founderId = req.user.userId;

        const idea = await prisma.idea.create({
            data: {
                title,
                description,
                category,
                stage,
                equityOffer: parseFloat(equityOffer),
                tags: tags || [],
                founderId,
            },
        });

        res.status(201).json(idea);
    } catch (error) {
        res.status(500).json({ message: 'Error creating idea', error: error.message });
    }
});

// Get all Ideas (Public)
router.get('/', async (req, res) => {
    try {
        const { category, stage } = req.query;
        const where = {};
        if (category) where.category = category;
        if (stage) where.stage = stage;
        where.status = "OPEN";

        const ideas = await prisma.idea.findMany({
            where,
            include: {
                founder: {
                    select: {
                        email: true,
                        profile: {
                            select: {
                                firstName: true,
                                lastName: true,
                                avatarUrl: true
                            }
                        }
                    }
                }
            },
            orderBy: { createdAt: 'desc' },
        });

        res.json(ideas);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching ideas', error: error.message });
    }
});

// Get specific Idea (Public)
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const idea = await prisma.idea.findUnique({
            where: { id },
            include: {
                founder: {
                    select: {
                        email: true,
                        profile: true
                    }
                }
            },
        });

        if (!idea) {
            return res.status(404).json({ message: 'Idea not found' });
        }

        res.json(idea);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching idea', error: error.message });
    }
});

module.exports = router;
