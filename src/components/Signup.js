// src/components/Signup.js
import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const Signup = ({ onSignup }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = (e) => {
    e.preventDefault();

    // Check if the user already exists
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = existingUsers.find(user => user.username === username);

    if (userExists) {
      alert('Username already exists. Please choose another one.');
      return;
    }

    // Add the new user to localStorage
    const newUser = { username, password };
    const updatedUsers = [...existingUsers, newUser];
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    alert('Signup successful. Please login now.');
    onSignup();
  };

  return (
    <Form onSubmit={handleSignup}>
      <h2>Signup</h2>
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
        Signup
      </Button>
    </Form>
  );
};

export default Signup;
