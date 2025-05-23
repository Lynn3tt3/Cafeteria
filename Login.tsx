import React, { useState, useEffect } from 'react'; // Import useEffect
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../styles/styles.css';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Function to handle user login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post(
        "http://localhost/backend/login.php",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      console.log('Full login response:', response);

      const data = response.data;
      if (!data || typeof data !== 'object') {
        setError('Invalid response from server.');
        return;
      }

      if (data.status === 'success' && data.user && data.user.role) {
        const role = data.user.role.toLowerCase();

        // Save to local storage
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('token', data.token || '');

        console.log('Login successful, role:', role);

        // Redirect immediately after setting the role in local storage
        if (role === 'student') {
          navigate('/student/home');
        } else if (role === 'staff') {
          navigate('/staff/home');
        } else {
          setError('Invalid User Role');
        }
      } else {
        console.warn('Login rejected by server:', data.message);
        setError(data.message || 'Invalid email or password.');
      }
    } catch (err: any) {
      console.error('Login error:', err);
      setError('Something went wrong. Please try again.');
    }
  };

  // Check for existing user 
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
          if (user.role === 'student') {
            navigate('/student/home');
          } else if (user.role === 'staff') {
            navigate('/staff/home');
          }
      } catch (e) {
        console.error("Error parsing user from localStorage:", e);
        // Handle the error appropriately, maybe clear the invalid data
        localStorage.removeItem('user');
      }
    }
  }, [navigate]); // Add navigate to the dependency array

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleLogin}>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input type="password" placeholder="password" value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>
      </form>

      {/* Link to register page */}
      <p>
        Don't have an account?
        <a href="/register">Register here</a>
      </p>
    </div>
  );
};

export default Login;