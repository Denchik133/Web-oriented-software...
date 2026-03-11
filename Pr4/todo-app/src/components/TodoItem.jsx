function TodoItem({ task, deleteTask }) {
  return (
    <li className="todo-item">
      {task.title}

      <button
        onClick={() => deleteTask(task.id)}
        style={{ marginLeft: "10px" }}
      >
        Delete
      </button>
    </li>
  );
}

export default TodoItem;