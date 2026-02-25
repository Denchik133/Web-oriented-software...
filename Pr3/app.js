import express from 'express';

const app = express();
const PORT = 3000;

app.use(express.json());

const tasks = [];
let currentId = 1;

// GET /tasks - список задач
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// GET /tasks/:id - отримати одну задачу
app.get('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const task = tasks.find(t => t.id === id);
  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }
  res.json(task);
});

// POST /tasks - створити задачу
app.post('/tasks', (req, res) => {
  const newTask = {
    id: currentId++,
    title: req.body.title
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// PATCH /tasks/:id - оновити задачу
app.patch('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const task = tasks.find(t => t.id === id);
  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }
  if (req.body.title !== undefined) {
    task.title = req.body.title;
  }
  res.json(task);
});

// DELETE /tasks/:id - видалити задачу
app.delete('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = tasks.findIndex(t => t.id === id);
  if (index === -1) {
    return res.status(404).json({ message: 'Task not found' });
  }
  tasks.splice(index, 1);
  res.json({ message: 'Task deleted' });
});
app.listen(PORT, () => {
  console.log(`Express server running on http://localhost:${PORT}`);
});