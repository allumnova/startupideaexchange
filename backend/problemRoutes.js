const express = require('express');
const router = express.Router();
const { getProblems, createProblem, getProblemById } = require('./problemController');
const { postSolution, voteProblem } = require('./solutionController');
const authMiddleware = require('./authMiddleware');

// Problems
router.get('/', getProblems);
router.get('/:id', getProblemById);
router.post('/', authMiddleware, createProblem);

// Solutions & Voting
router.post('/solution', authMiddleware, postSolution);
router.post('/vote', authMiddleware, voteProblem);

module.exports = router;
