// import { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import API from '../api/api';
// import { saveToken } from '../utils/auth';

// export default function Login() {
//   const [form, setForm] = useState({ email: '', password: '' });
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleChange = (e) =>
//     setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       setError('');
//       const res = await API.post('/api/users/login', form);
//       saveToken(res.data.token);
//       navigate('/');
//     } catch (err) {
//       setError(err.response?.data?.message || 'Login failed');
//     }
//   };

//   return (
//     <div className="login-container">
//       <h2 className="login-title">Login</h2>
//       <form onSubmit={handleSubmit} className="login-form">
//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={form.email}
//           onChange={handleChange}
//           required
//           className="form-input"
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={form.password}
//           onChange={handleChange}
//           required
//           className="form-input mt-10"
//         />
//         {error && <p className="error-text mt-10">{error}</p>}
//         <button type="submit" className="btn-submit mt-15">Login</button>
//       </form>

//       <p className="register-link mt-20">
//         Don’t have an account? <Link to="/register" className="link">Register</Link>
//       </p>
//     </div>
//   );
// }


import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../api/api';
import { saveToken } from '../utils/auth';
import { loginWithGoogle, loginWithGithub } from '../firebaseAuth';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError('');
      const res = await API.post('/api/users/login', form);
      saveToken(res.data.token);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setError('');
      const res = await loginWithGoogle();
      saveToken(res.data.token);
      navigate('/');
    } catch (err) {
      console.error(err);
      setError('Google login failed');
    }
  };

  const handleGithubLogin = async () => {
    try {
      setError('');
      const res = await loginWithGithub();
      saveToken(res.data.token);
      navigate('/');
    } catch (err) {
      console.error(err);
      setError('GitHub login failed');
    }
  };

  return (
    <>
      <div className="login-wrapper">
  <div className="login-left">
    <img
      src="/images/login-bg.jpg"
      alt="Login Illustration"
      className="login-image"
    />
  </div>
  <div className="login-right">
    <h2 className="login-title">Login</h2>

    <form onSubmit={handleSubmit} className="login-form">
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
        className="form-input"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        required
        className="form-input mt-10"
      />
      {error && <p className="error-text mt-10">{error}</p>}
      <button type="submit" className="btn-submit mt-15">Login</button>
    </form>

    <div className="social-login mt-20">
      <p>Or</p>
      <button onClick={handleGoogleLogin} className="btn-social mt-10">
  <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="icon" />
  Continue with Google
</button>

<button onClick={handleGithubLogin} className="btn-social mt-10">
  <img src="https://www.svgrepo.com/show/512317/github-142.svg" alt="GitHub" className="icon" />
  Continue with GitHub
</button>

    </div>

    <p className="register-link mt-20">
      Don’t have an account? <Link to="/register" className="link">Register</Link>
    </p>
  </div>

  <style>{`
    .login-wrapper {
      display: flex;
      min-height: 100vh;
      background-color: #f3f4f6;
    }

    .login-left {
      flex: 1;
      display: none;
    }

    .login-image {
      width: 100%;
      height: 100vh;
      object-fit: cover;
    }

    @media (min-width: 768px) {
      .login-left {
        display: block;
      }
    }

    .login-right {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 40px;
      background-color: #fff;
    }

    .login-title {
      font-size: 2rem;
      font-weight: bold;
      color: #333;
      margin-bottom: 1rem;
    }

    .login-form {
      width: 100%;
      max-width: 400px;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .form-input {
      padding: 12px 16px;
      border: 1px solid #ccc;
      border-radius: 6px;
      font-size: 1rem;
    }

    .btn-submit,
    .btn-google,
    .btn-github {
      padding: 12px;
      border: none;
      border-radius: 6px;
      font-weight: bold;
      cursor: pointer;
      transition: background 0.3s ease;
    }

    .btn-submit {
      background-color: #3b82f6;
      color: white;
    }

    .btn-submit:hover {
      background-color: #2563eb;
    }

    .btn-google {
      background-color: #fee2e2;
      color: #b91c1c;
    }

    .btn-google:hover {
      background-color: #fecaca;
    }

    .btn-github {
      background-color: #e5e7eb;
      color: #111827;
    }

    .btn-github:hover {
      background-color: #d1d5db;
    }

    .error-text {
      color: red;
      font-size: 0.9rem;
    }

    .register-link {
      text-align: center;
      font-size: 0.9rem;
    }

    .link {
      color: #3b82f6;
      text-decoration: none;
    }

    .link:hover {
      text-decoration: underline;
    }

    .mt-10 {
      margin-top: 10px;
    }

    .mt-15 {
      margin-top: 15px;
    }

    .mt-20 {
      margin-top: 20px;
    }
      .btn-social {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s ease;
  justify-content: center;
  width: 100%;
  max-width: 400px;
  background-color: #f1f5f9;
  color: #1f2937;
}

.btn-social:hover {
  background-color: #e2e8f0;
}

.icon {
  width: 24px;
  height: 24px;
}

  `}</style>
</div>

    </>
  );
}
