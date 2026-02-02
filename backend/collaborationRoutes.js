const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const authMiddleware = require('./authMiddleware');

const prisma = new PrismaClient();

// Express interest in an idea
router.post('/ideas/:id/interest', authMiddleware, async (req, res) => {
    try {
        const ideaId = req.params.id;
        const userId = req.user.userId;
        const { message } = req.body;

        // Check if idea exists
        const idea = await prisma.idea.findUnique({ where: { id: ideaId } });
        if (!idea) return res.status(404).json({ message: 'Idea not found' });

        // Can't express interest in your own idea
        if (idea.founderId === userId) {
            return res.status(400).json({ message: 'You cannot connect with your own concept' });
        }

        const interest = await prisma.interest.create({
            data: {
                ideaId,
                userId,
                message,
            },
        });

        res.status(201).json(interest);
    } catch (error) {
        if (error.code === 'P2002') {
            return res.status(400).json({ message: 'You have already expressed interest in this concept' });
        }
        res.status(500).json({ message: 'Error expressing interest', error: error.message });
    }
});

// Get interest for an idea (Owner only)
router.get('/ideas/:id/interests', authMiddleware, async (req, res) => {
    try {
        const ideaId = req.params.id;
        const userId = req.user.userId;

        const idea = await prisma.idea.findUnique({
            where: { id: ideaId },
            include: {
                interests: {
                    include: {
                        user: {
                            include: { profile: true }
                        }
                    }
                }
            }
        });

        if (!idea) return res.status(404).json({ message: 'Idea not found' });
        if (idea.founderId !== userId) return res.status(403).json({ message: 'Unauthorized' });

        res.json(idea.interests);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching interests', error: error.message });
    }
});

// Get Public Profile
router.get('/profile/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                profile: true,
                ideas: {
                    where: { status: 'OPEN' },
                    orderBy: { createdAt: 'desc' }
                }
            }
        });

        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching profile', error: error.message });
    }
});

module.exports = router;
