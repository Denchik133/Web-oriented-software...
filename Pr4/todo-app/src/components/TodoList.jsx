import TodoItem from "./TodoItem";

function TodoList({ tasks }) {
  return (
    <ul className="todo-list">
      {tasks.map(task => (
        <TodoItem key={task.id} task={task} />
      ))}
    </ul>
  );
}

export default TodoList;