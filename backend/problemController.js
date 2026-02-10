const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getProblems = async (req, res) => {
    try {
        const { category, sort } = req.query;

        let orderBy = { createdAt: 'desc' };
        if (sort === 'demand') {
            orderBy = { demandScore: 'desc' };
        }

        const problems = await prisma.problem.findMany({
            where: category ? { category } : {},
            orderBy,
            include: {
                _count: {
                    select: { solutions: true, votes: true }
                },
                poster: {
                    select: {
                        profile: {
                            select: { firstName: true, avatarUrl: true }
                        }
                    }
                }
            }
        });
        res.json(problems);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createProblem = async (req, res) => {
    try {
        const { title, description, category, tags } = req.body;
        const problem = await prisma.problem.create({
            data: {
                title,
                description,
                category,
                tags,
                posterId: req.user.id
            }
        });
        res.status(201).json(problem);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getProblemById = async (req, res) => {
    try {
        const { id } = req.params;
        const problem = await prisma.problem.findUnique({
            where: { id },
            include: {
                solutions: {
                    include: {
                        author: {
                            select: {
                                profile: { select: { firstName: true, avatarUrl: true } }
                            }
                        }
                    }
                },
                poster: {
                    select: {
                        profile: { select: { firstName: true, avatarUrl: true } }
                    }
                },
                _count: {
                    select: { votes: true }
                }
            }
        });
        if (!problem) return res.status(404).json({ error: 'Problem not found' });
        res.json(problem);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getProblems, createProblem, getProblemById };
