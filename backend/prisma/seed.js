const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const path = require('path');

const prisma = new PrismaClient({
    datasources: {
        db: {
            url: process.env.DATABASE_URL
        },
    },
});

async function main() {
    console.log('Seeding data...');

    // 1. Clean data
    await prisma.interest.deleteMany();
    await prisma.idea.deleteMany();
    await prisma.profile.deleteMany();
    await prisma.user.deleteMany();

    const hashedPassword = await bcrypt.hash('password123', 10);

    // 2. Create Users & Profiles
    const users = [
        {
            email: 'alex.chen@allumnova.com',
            firstName: 'Alex',
            lastName: 'Chen',
            bio: 'Ex-Google PM with 10 years in AI. Looking to build decentralized compute networks.',
            skills: ['AI/ML', 'Product Strategy', 'Rust'],
            interests: ['Decentralization', 'Sustainability']
        },
        {
            email: 'sarah.miller@startup.io',
            firstName: 'Sarah',
            lastName: 'Miller',
            bio: 'UX Designer turned founder. Passionate about green energy and consumer hardware.',
            skills: ['Product Design', 'Hardware', 'Marketing'],
            interests: ['Green Tech', 'Social Impact']
        },
        {
            email: 'demo.founder@exchange.com',
            firstName: 'Demo',
            lastName: 'Founder',
            bio: 'The default demonstration account for the Startup Idea Exchange platform.',
            skills: ['Business Dev', 'Idea Validation', 'Networking'],
            interests: ['Everything Startup']
        }
    ];

    const createdUsers = [];
    for (const u of users) {
        const user = await prisma.user.create({
            data: {
                email: u.email,
                password: hashedPassword,
                profile: {
                    create: {
                        firstName: u.firstName,
                        lastName: u.lastName,
                        bio: u.bio,
                        skills: u.skills,
                        interests: u.interests,
                        avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${u.firstName}`
                    }
                }
            },
            include: { profile: true }
        });
        createdUsers.push(user);
        console.log(`Created user: ${u.email}`);
    }

    // 3. Create Startup Ideas
    const ideas = [
        {
            title: 'NeuralFleet: Autonomous Drone Logistics',
            description: 'A decentralized swarm intelligence platform for managing autonomous drone deliveries in urban environments. We optimize for high-density traffic and battery efficiency.',
            category: 'AI/ML',
            stage: 'Concept',
            equityOffer: 15.0,
            tags: ['Drones', 'Logistics', 'Robotics'],
            founderEmail: 'alex.chen@allumnova.com'
        },
        {
            title: 'EcoTrace: Real-time Carbon Credits',
            description: 'Blockchain-based platform that tracks micro-level carbon emissions for SMBs and instantly converts reductions into tradeable carbon credits.',
            category: 'GreenTech',
            stage: 'MVP Ready',
            equityOffer: 10.5,
            tags: ['Web3', 'Sustainability', 'Fintech'],
            founderEmail: 'sarah.miller@startup.io'
        },
        {
            title: 'MindMesh: Cognitive Enhancing Wearables',
            description: 'EEG-integrated headsets that use subtle haptic feedback to improve focus and reduce stress levels for high-performance knowledge workers.',
            category: 'Health',
            stage: 'In-Dev',
            equityOffer: 12.0,
            tags: ['MedTech', 'Wearables', 'BioHacking'],
            founderEmail: 'alex.chen@allumnova.com'
        },
        {
            title: 'FluxPay: Programmable Payroll',
            description: 'Smart contract based payroll system that allows employees to be paid in real-time, per minute, with automated tax and pension deductions.',
            category: 'Fintech',
            stage: 'Concept',
            equityOffer: 8.0,
            tags: ['DeFi', 'Payments', 'Enterprise'],
            founderEmail: 'demo.founder@exchange.com'
        }
    ];

    for (const i of ideas) {
        const founder = createdUsers.find(u => u.email === i.founderEmail);
        await prisma.idea.create({
            data: {
                title: i.title,
                description: i.description,
                category: i.category,
                stage: i.stage,
                equityOffer: i.equityOffer,
                tags: i.tags,
                founderId: founder.id
            }
        });
        console.log(`Created idea: ${i.title}`);
    }

    console.log('Seed completed successfully!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
