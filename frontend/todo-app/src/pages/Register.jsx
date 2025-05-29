import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../api/api';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError('');
      await API.post('/api/users/register', form);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <>
      <style>{`
        .register-container {
          display: flex;
          height: 100vh;
          width: 100vw;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        .left-half {
          width: 50%;
          background-image: linear-gradient(rgba(136, 0, 255, 0.4), rgba(255, 0, 128, 0.4)),
            url('/images/register-bg.jpg');
          background-size: cover;
          background-repeat: no-repeat;
          background-position: center;
        }

        .right-half {
          width: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: #fff;
          padding: 60px 80px;
        }

        .form-wrapper {
          width: 100%;
          max-width: 400px;
        }

        .register-title {
          font-size: 2.5rem;
          color: #333;
          margin-bottom: 30px;
          font-weight: 700;
        }

        .register-form {
          display: flex;
          flex-direction: column;
        }

        .form-input {
          padding: 14px 18px;
          margin-bottom: 20px;
          font-size: 1rem;
          border: 1.8px solid #ccc;
          border-radius: 8px;
        }

        .form-input:focus {
          border-color: #7e6eb0;
          outline: none;
          box-shadow: 0 0 8px rgba(126, 110, 176, 0.3);
        }

        .btn-submit {
          padding: 14px;
          background-color: #d946ef;
          color: #fff;
          font-weight: 600;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-size: 1.1rem;
          transition: background-color 0.3s ease;
        }

        .btn-submit:hover {
          background-color: #c026d3;
        }

        .error-text {
          color: #d94f4f;
          margin-bottom: 15px;
          font-weight: 600;
        }

        .login-link {
          margin-top: 30px;
          color: #555;
          font-weight: 500;
          text-align: center;
        }

        .link {
          color: #7e6eb0;
          text-decoration: none;
          font-weight: 700;
        }

        .link:hover {
          text-decoration: underline;
        }

        @media (max-width: 768px) {
          .register-container {
            flex-direction: column;
          }

          .left-half, .right-half {
            width: 100%;
            height: 50vh;
          }

          .right-half {
            padding: 30px 25px;
          }
        }
      `}</style>

      <div className="register-container">
        <div className="left-half"></div>
        <div className="right-half">
          <div className="form-wrapper">
            <h2 className="register-title">Sign Up</h2>
            <form onSubmit={handleSubmit} className="register-form">
              <input
                name="name"
                placeholder="Full Name"
                onChange={handleChange}
                value={form.name}
                required
                className="form-input"
              />
              <input
                name="email"
                type="email"
                placeholder="Email"
                onChange={handleChange}
                value={form.email}
                required
                className="form-input"
              />
              <input
                name="password"
                type="password"
                placeholder="Password"
                onChange={handleChange}
                value={form.password}
                required
                className="form-input"
              />
              {error && <p className="error-text">{error}</p>}
              <button type="submit" className="btn-submit">Sign Up</button>
            </form>
            <p className="login-link">
              Already have an account? <Link to="/login" className="link">Sign in →</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
