import { useState } from 'react';
import API from '../api/api';

export default function TodoForm({ refresh, onAdd }) {
  const [form, setForm] = useState({
    title: '',
    description: '',
    isCompleted: false,
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title.trim()) {
      setError('Title is required');
      return;
    }

    try {
      setLoading(true);
      await API.post('/api/todos', form);
      setForm({ title: '', description: '', isCompleted: false });
      refresh();
      onAdd();
      setError('');
    } catch (err) {
      setError('Failed to add todo');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="todo-card">
        <h2 className="card-title">Add New Todo</h2>
        <form onSubmit={handleSubmit} className="todo-form">
          <input
            name="title"
            placeholder="Title"
            onChange={handleChange}
            value={form.title}
            required
            className="form-input"
          />
          <input
            name="description"
            placeholder="Description"
            onChange={handleChange}
            value={form.description}
            className="form-input mt-10"
          />
          <label className="checkbox-label mt-10">
            <input
              type="checkbox"
              name="isCompleted"
              checked={form.isCompleted}
              onChange={handleChange}
              className="checkbox-input"
            />
            &nbsp;Completed
          </label>
          {error && <p className="error-text">{error}</p>}
          <button type="submit" disabled={loading} className="submit-button mt-10">
            {loading ? 'Adding...' : 'Add Todo'}
          </button>
        </form>
      </div>

      <style>{`
      
        .todo-card {
          max-width: 400px;
          margin: 3rem auto;
          padding: 2rem 2.5rem;
          background: #fff;
          border-radius: 12px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          color: #333;
        }

        .card-title {
          text-align: center;
          margin-bottom: 1.5rem;
          font-weight: 700;
          color: #4a90e2;
          font-size: 1.8rem;
        }

        .todo-form {
          display: flex;
          flex-direction: column;
        }

        .form-input {
          padding: 12px 16px;
          font-size: 1rem;
          border: 1.5px solid #ccc;
          border-radius: 8px;
          outline: none;
          transition: border-color 0.3s ease;
        }

        .form-input:focus {
          border-color: #4a90e2;
          box-shadow: 0 0 6px #4a90e2aa;
        }

        .mt-10 {
          margin-top: 10px;
        }

        .checkbox-label {
          font-size: 1rem;
          color: #555;
          display: flex;
          align-items: center;
          gap: 8px;
          user-select: none;
          cursor: pointer;
        }

        .checkbox-input {
          width: 18px;
          height: 18px;
          cursor: pointer;
          accent-color: #4a90e2;
        }

        .error-text {
          color: #e74c3c;
          margin-top: 10px;
          font-weight: 600;
          font-size: 0.9rem;
          text-align: center;
        }

        .submit-button {
          margin-top: 20px;
          padding: 12px 20px;
          font-size: 1.1rem;
          font-weight: 600;
          background: linear-gradient(135deg, #4a90e2, #357ABD);
          border: none;
          border-radius: 10px;
          color: white;
          cursor: pointer;
          transition: background 0.3s ease;
          box-shadow: 0 4px 15px rgba(54, 114, 230, 0.4);
        }

        .submit-button:hover:not(:disabled) {
          background: linear-gradient(135deg, #357ABD, #4a90e2);
          box-shadow: 0 6px 20px rgba(54, 114, 230, 0.6);
        }

        .submit-button:disabled {
          cursor: not-allowed;
          background: #a3c2f7;
          box-shadow: none;
          color: #f0f0f0;
        }
      `}</style>
    </>
  );
}
