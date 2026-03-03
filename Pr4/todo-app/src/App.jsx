import TodoList from "./components/TodoList";

const tasks = [
  { id: 1, title: "Learn React" },
  { id: 2, title: "Build Todo App" },
  { id: 3, title: "Push to GitHub" }
];

function App() {
  return (
    <div className="container">
      <h1>Todo List</h1>
      <TodoList tasks={tasks} />
    </div>
  );
}

export default App;