import { useEffect, useState } from 'react';
import API from '../api/api';
import TodoList from '../components/TodoList';
import TodoForm from '../components/TodoForm';
import { useNavigate } from 'react-router-dom';

export default function Todos() {
  const [todos, setTodos] = useState([]);
  const [showTodos, setShowTodos] = useState(false);
  const navigate = useNavigate();

  const fetchTodos = async () => {
    const res = await API.get('/api/todos');
    setTodos(res.data);
  };

  useEffect(() => {
    if (!localStorage.getItem('token')) navigate('/login');
    fetchTodos();
  }, []);

  return (
    <div className="todos-container">
      <h2 className="todos-title">Create Todo</h2>
      <TodoForm refresh={fetchTodos} onAdd={() => setShowTodos(true)} />

      <button
        onClick={() => setShowTodos((prev) => !prev)}
        className="btn-toggle-todos"
        style={{ marginTop: 20 }}
      >
        {showTodos ? 'Hide Todos' : 'View Todos'}
      </button>

      {showTodos && (
        <div className="todos-list-container" style={{ marginTop: 20 }}>
          <h3 className="todos-list-title">All Todos</h3>
          <TodoList todos={todos} refresh={fetchTodos} />
        </div>
      )}
    </div>
  );
}
