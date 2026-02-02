const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const authRoutes = require('./authRoutes');
const ideaRoutes = require('./ideaRoutes');
const collaborationRoutes = require('./collaborationRoutes');

const app = express();
const prisma = new PrismaClient();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/ideas', ideaRoutes);
app.use('/api/collab', collaborationRoutes);

app.get('/', (req, res) => {
  res.send('Startup Idea Exchange API is running...');
});

app.get('/health', async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({ status: 'OK', db: 'Connected (Prisma)' });
  } catch (err) {
    res.status(500).json({ status: 'Error', error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
