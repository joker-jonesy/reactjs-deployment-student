const express = require('express');
const prisma = require('./prisma');

const app = express();
app.use(express.json());

const router = express.Router();

// Express 4 doesn't catch errors from async handlers, so we pass them along ourselves
const wrap = (fn) => (req, res, next) => fn(req, res, next).catch(next);

// READ all
router.get('/tasks', wrap(async (req, res) => {
  const tasks = await prisma.task.findMany({ orderBy: { createdAt: 'desc' } });
  res.json(tasks);
}));

// READ one
router.get('/tasks/:id', wrap(async (req, res) => {
  const task = await prisma.task.findUnique({ where: { id: Number(req.params.id) } });
  if (!task) return res.status(404).json({ error: 'Task not found' });
  res.json(task);
}));

// CREATE
router.post('/tasks', wrap(async (req, res) => {
  const { title, notes } = req.body;
  if (!title || !title.trim()) return res.status(400).json({ error: 'Title is required' });
  const task = await prisma.task.create({ data: { title: title.trim(), notes: notes || '' } });
  res.status(201).json(task);
}));

// UPDATE
router.put('/tasks/:id', wrap(async (req, res) => {
  const { title, notes, done } = req.body;
  try {
    const task = await prisma.task.update({
      where: { id: Number(req.params.id) },
      data: { title, notes, done },
    });
    res.json(task);
  } catch (err) {
    if (err.code === 'P2025') return res.status(404).json({ error: 'Task not found' });
    throw err;
  }
}));

// DELETE
router.delete('/tasks/:id', wrap(async (req, res) => {
  try {
    await prisma.task.delete({ where: { id: Number(req.params.id) } });
    res.status(204).end();
  } catch (err) {
    if (err.code === 'P2025') return res.status(404).json({ error: 'Task not found' });
    throw err;
  }
}));

app.use(['/api', '/.netlify/functions/api'],router);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Something went wrong' });
});

module.exports = app;
