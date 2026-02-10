const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const postSolution = async (req, res) => {
    try {
        const { type, description, links, problemId } = req.body;
        const solution = await prisma.solution.create({
            data: {
                type,
                description,
                links,
                problemId,
                authorId: req.user.id
            }
        });

        // Increment demand score of the problem when someone posts a solution (engagement)
        await prisma.problem.update({
            where: { id: problemId },
            data: { demandScore: { increment: 5 } }
        });

        res.status(201).json(solution);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const voteProblem = async (req, res) => {
    try {
        const { problemId, value } = req.body; // value: 1 or -1
        const userId = req.user.id;

        const vote = await prisma.vote.upsert({
            where: {
                userId_problemId: { userId, problemId }
            },
            update: { value },
            create: { userId, problemId, value }
        });

        // Update problem demand score (upvote = +10, downvote = -5)
        const demandInc = value > 0 ? 10 : -5;
        await prisma.problem.update({
            where: { id: problemId },
            data: { demandScore: { increment: demandInc } }
        });

        res.json(vote);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { postSolution, voteProblem };
