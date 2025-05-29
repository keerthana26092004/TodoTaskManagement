import API from '../api/api';


export default function TodoList({ todos, refresh }) {
  const deleteTodo = async (id) => {
    await API.delete(`/api/todos/${id}`);
    refresh();
  };

  const toggleComplete = async (todo) => {
    await API.put(`/api/todos/${todo._id}`, {
      ...todo,
      isCompleted: !todo.isCompleted,
    });
    refresh();
  };

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <li key={todo._id} className={`todo-item ${todo.isCompleted ? 'completed' : ''}`}>
          <div className="todo-header">
            <h4 className="todo-title">{todo.title}</h4>
            <span className={`badge ${todo.isCompleted ? 'badge-completed' : 'badge-pending'}`}>
              {todo.isCompleted ? '✔ Completed' : '⌛ Pending'}
            </span>
          </div>
          <p className="todo-description">{todo.description}</p>
          <p className="todo-created">🗓 {new Date(todo.createdAt).toLocaleString()}</p>

          <div className="todo-actions">
            <button className="btn btn-toggle" onClick={() => toggleComplete(todo)}>
              {todo.isCompleted ? '↩ Mark as Pending' : '✅ Mark as Completed'}
            </button>
            <button className="btn btn-delete" onClick={() => deleteTodo(todo._id)}>
              🗑 Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
