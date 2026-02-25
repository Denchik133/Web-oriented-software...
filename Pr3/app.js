import http from 'http';

const PORT = 3000;

const tasks = [];
let currentId = 1;

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'application/json');

  // GET /tasks - список задач
  if (req.method === 'GET' && req.url === '/tasks') {
    res.end(JSON.stringify(tasks));
    return;
  }

  // GET /tasks/:id - отримати одну задачу
  if (req.method === 'GET' && req.url.startsWith('/tasks/')) {
    const id = parseInt(req.url.split('/')[2]);
    const task = tasks.find(t => t.id === id);
    if (!task) {
      res.statusCode = 404;
      res.end(JSON.stringify({ message: 'Task not found' }));
      return;
    }
    res.end(JSON.stringify(task));
    return;
  }

  // POST /tasks - створити задачу
  if (req.method === 'POST' && req.url === '/tasks') {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
    });
    req.on('end', () => {
      const data = JSON.parse(body);
      const newTask = {
        id: currentId++,
        title: data.title
      };
      tasks.push(newTask);
      res.statusCode = 201;
      res.end(JSON.stringify(newTask));
    });
    return;
  }

  // PATCH /tasks/:id - оновити задачу
  if (req.method === 'PATCH' && req.url.startsWith('/tasks/')) {
    const id = parseInt(req.url.split('/')[2]);
    const task = tasks.find(t => t.id === id);
    if (!task) {
      res.statusCode = 404;
      res.end(JSON.stringify({ message: 'Task not found' }));
      return;
    }
    let body = '';
    req.on('data', chunk => {
      body += chunk;
    });
    req.on('end', () => {
      const data = JSON.parse(body);
      if (data.title !== undefined) {
        task.title = data.title;
      }
      res.end(JSON.stringify(task));
    });
    return;
  }
  // DELETE /tasks/:id - видалити задачу
  if (req.method === 'DELETE' && req.url.startsWith('/tasks/')) {
    const id = parseInt(req.url.split('/')[2]);
    const index = tasks.findIndex(t => t.id === id);
    if (index === -1) {
      res.statusCode = 404;
      res.end(JSON.stringify({ message: 'Task not found' }));
      return;
    }
    tasks.splice(index, 1);
    res.end(JSON.stringify({ message: 'Task deleted' }));
    return;
  }
  res.statusCode = 404;
  res.end(JSON.stringify({ message: 'Route not found' }));
});
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});