import TodoItem from "./TodoItem";

function TodoList({ tasks, deleteTask }) {
  return (
    <ul className="todo-list">
      {tasks.map(task => (
        <TodoItem
          key={task.id}
          task={task}
          deleteTask={deleteTask}
        />
      ))}
    </ul>
  );
}

export default TodoList;