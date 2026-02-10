const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function main() {
    console.log('Clearing old data...');
    await prisma.transaction.deleteMany();
    await prisma.vote.deleteMany();
    await prisma.product.deleteMany();
    await prisma.solution.deleteMany();
    await prisma.problem.deleteMany();
    await prisma.profile.deleteMany();
    await prisma.user.deleteMany();

    console.log('Seeding ATO data...');

    const hashedPassword = await bcrypt.hash('password', 10);

    // Create Users
    const alex = await prisma.user.create({
        data: {
            email: 'alex.chen@allumnova.com',
            password: hashedPassword,
            onboarded: true,
            userType: 'Founder',
            industries: ['AI/ML', 'SaaS'],
            skills: ['Product Management', 'Strategy'],
            profile: {
                create: {
                    firstName: 'Alex',
                    lastName: 'Chen',
                    bio: 'Serial founder looking to solve real-world problems.'
                }
            }
        }
    });

    const sarah = await prisma.user.create({
        data: {
            email: 'sarah.builder@example.com',
            password: hashedPassword,
            onboarded: true,
            userType: 'Builder',
            industries: ['GreenTech', 'Fintech'],
            skills: ['React', 'Node.js', 'Python'],
            profile: {
                create: {
                    firstName: 'Sarah',
                    lastName: 'Smith',
                    bio: 'Passionate developer building sustainable tech.'
                }
            }
        }
    });

    // Create Problems
    const problem1 = await prisma.problem.create({
        data: {
            title: 'Inefficient Energy Monitoring in Small Offices',
            description: 'Small offices lack affordable, real-time energy monitoring tools that provide actionable insights to reduce waste.',
            category: 'GreenTech',
            tags: ['Energy', 'IOT', 'SME'],
            demandScore: 45,
            posterId: alex.id
        }
    });

    const problem2 = await prisma.problem.create({
        data: {
            title: 'Alumni Mentorship Matching at Scale',
            description: 'Current platforms fail to match alumni mentors with students based on deep skill compatibility and real-time availability.',
            category: 'EdTech',
            tags: ['Mentorship', 'Automation', 'AI'],
            demandScore: 82,
            posterId: alex.id
        }
    });

    // Create Solutions
    await prisma.solution.create({
        data: {
            type: 'IDEA',
            description: 'Using low-cost Zigbee sensors combined with a centralized hub for small office energy tracking.',
            problemId: problem1.id,
            authorId: sarah.id
        }
    });

    await prisma.solution.create({
        data: {
            type: 'PRODUCT',
            description: 'A React/Node based MVP for AI-driven mentorship matching.',
            problemId: problem2.id,
            authorId: sarah.id
        }
    });

    // Create Products
    await prisma.product.create({
        data: {
            name: 'MentorMatch MVP Source Code',
            description: 'Fully functional MVP for solving the mentorship matching problem. Includes auth, matching logic, and dashboard.',
            price: 4999,
            problemId: problem2.id,
            sellerId: sarah.id
        }
    });

    console.log('Seeding complete! User alex.chen@allumnova.com / password');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
