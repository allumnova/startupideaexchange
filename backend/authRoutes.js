const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'your_super_secret_key_change_me';

// Register User
router.post('/register', async (req, res) => {
    try {
        const { email, password, firstName, lastName } = req.body;

        // Check if user exists
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user and profile
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                profile: {
                    create: {
                        firstName,
                        lastName,
                    },
                },
            },
            include: {
                profile: true,
            },
        });

        res.status(201).json({ message: 'User created successfully', userId: user.id });
    } catch (error) {
        console.error('REGISTRATION ERROR:', error);
        res.status(500).json({ message: 'Error creating user', error: error.message });
    }
});

// Login User
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user
        const user = await prisma.user.findUnique({
            where: { email },
            include: { profile: true }
        });

        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Create token
        const token = jwt.sign(
            { userId: user.id, email: user.email, role: user.role },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({
            token,
            user: {
                id: user.id,
                email: user.email,
                role: user.role,
                profile: user.profile
            }
        });
    } catch (error) {
        console.error('LOGIN ERROR:', error);
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
    // Get Current User Profile
    router.get('/me', authMiddleware, async (req, res) => {
        try {
            const userId = req.user.userId;
            const user = await prisma.user.findUnique({
                where: { id: userId },
                include: { profile: true }
            });

            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            res.json({ user });
        } catch (error) {
            console.error('ME ROUTE ERROR:', error);
            res.status(500).json({ message: 'Error fetching profile', error: error.message });
        }
    });

    const authMiddleware = require('./authMiddleware');

    // Update Profile and Complete Onboarding
    router.put('/profile', authMiddleware, async (req, res) => {
        try {
            const { firstName, lastName, bio, skills, industries, role } = req.body;
            const userId = req.user.userId; // Use userId from decoded token

            const updatedUser = await prisma.user.update({
                where: { id: userId },
                data: {
                    skills: skills || [],
                    industries: industries || [],
                    role: role || 'USER',
                    onboarded: true,
                    profile: {
                        upsert: {
                            create: { firstName, lastName, bio },
                            update: { firstName, lastName, bio }
                        }
                    }
                },
                include: { profile: true }
            });

            res.json({ message: 'Profile updated successfully', user: updatedUser });
        } catch (error) {
            console.error('PROFILE UPDATE ERROR:', error);
            res.status(500).json({ message: 'Error updating profile', error: error.message });
        }
    });

    module.exports = router;
