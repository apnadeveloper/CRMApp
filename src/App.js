// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { auth } from './firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import Signup from './components/Signup';
import Login from './components/Login';
import CustomerList from './components/CustomerList';
import AddCustomer from './components/AddCustomer';
import { Container, Button } from 'react-bootstrap';

const App = () => {
  const [user, setUser] = useState(null);
  const [customers, setCustomers] = useState([]);
  const [editingCustomer, setEditingCustomer] = useState(null);

  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser || null);
      if (currentUser) {
        // Load user-specific customers from localStorage
        const storedCustomers = JSON.parse(localStorage.getItem(`customers_${currentUser.uid}`)) || [];
        setCustomers(storedCustomers);
      } else {
        setCustomers([]);
      }
    });

    return () => unsubscribe();
  }, []);

  // Save customers to localStorage whenever they change
  useEffect(() => {
    if (user) {
      localStorage.setItem(`customers_${user.uid}`, JSON.stringify(customers));
    }
  }, [customers, user]);

  // Handler to add a new customer
  const addCustomer = (newCustomer) => {
    setCustomers([...customers, newCustomer]);
  };

  // Handler to update an existing customer
  const updateCustomer = (updatedCustomer) => {
    setCustomers(
      customers.map((customer) =>
        customer.id === updatedCustomer.id ? updatedCustomer : customer
      )
    );
    setEditingCustomer(null);
  };

  // Handler to delete a customer
  const deleteCustomer = (id) => {
    setCustomers(customers.filter((customer) => customer.id !== id));
  };

  return (
    <Router>
      <Container>
        <Routes>
          {/* Public Routes */}
          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/signup"
            element={user ? <Navigate to="/" /> : <Signup />}
          />

          {/* Private Route */}
          <Route
            path="/"
            element={
              user ? (
                <>
                  <div className="d-flex justify-content-between align-items-center my-4">
                    <h1>Welcome, {user.email}</h1>
                    <Button variant="danger" onClick={() => signOut(auth)}>
                      Logout
                    </Button>
                  </div>
                  {editingCustomer ? (
                    <AddCustomer
                      addCustomer={updateCustomer}
                      customerToEdit={editingCustomer}
                    />
                  ) : (
                    <AddCustomer addCustomer={addCustomer} />
                  )}
                  <CustomerList
                    customers={customers}
                    deleteCustomer={deleteCustomer}
                    setEditingCustomer={setEditingCustomer}
                  />
                </>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;
