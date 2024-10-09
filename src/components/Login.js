// src/components/Login.js
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    // Fetch users from localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
      // Save the logged-in user to localStorage
      localStorage.setItem('loggedInUser', username);
      onLogin(username);
    } else {
      alert('Invalid credentials. Please try again.');
    }
  };

  return (
    <Form onSubmit={handleLogin}>
      <h2>Login</h2>
      <Form.Group>
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Login
      </Button>
    </Form>
  );
};

export default Login;
