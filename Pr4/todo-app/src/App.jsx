import { useState } from "react";
import TodoList from "./components/TodoList";

const initialTasks = [
  { id: 1, title: "Learn React" },
  { id: 2, title: "Build Todo App" },
  { id: 3, title: "Push to GitHub" }
];

function App() {
  const [tasks, setTasks] = useState(initialTasks);
  const [newTask, setNewTask] = useState("");
  function addTask() {
    if (newTask.trim() === "") {
      return;
    }
    const task = {
      id: Date.now(),
      title: newTask
    };
    setTasks([...tasks, task]);
    setNewTask("");
  }

  function deleteTask(id) {
    setTasks(tasks.filter(task => task.id !== id));
  }

  return (
    <div className="container">
      <h1>Todo List</h1>
      <div>
        <input
          type="text"
          placeholder="New task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={addTask}>
          Add
        </button>
      </div>
      <TodoList tasks={tasks} deleteTask={deleteTask} />
    </div>
  );
}

export default App;