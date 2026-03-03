function TodoItem({ task }) {
  return (
    <li className="todo-item">
      {task.title}
    </li>
  );
}

export default TodoItem;