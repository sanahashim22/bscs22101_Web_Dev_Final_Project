import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HostPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/verify-host', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // If user is a host, redirect to host dashboard
        navigate('/host-dashboard');
      } else {
        setErrorMessage(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="host-login-container">
      <h2 className="host-login-title">Host Login</h2>
      <form onSubmit={handleLogin} className="host-login-form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="host-login-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="host-login-input"
        />
        <button type="submit" className="host-login-button">Login as Host</button>
      </form>
      {errorMessage && <p className="host-login-error">{errorMessage}</p>}
    </div>
  );
};

export default HostPage;
