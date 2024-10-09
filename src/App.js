import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap'; // Import Button from react-bootstrap
import CustomerList from './components/CustomerList';
import AddCustomer from './components/AddCustomer';
import FilterSort from './components/FilterSort';
import Login from './components/Login';
import Signup from './components/Signup';

// The rest of your code...


const App = () => {
  const [customers, setCustomers] = useState([]);
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState('');
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(null); // For tracking the logged-in user
  const [isSignup, setIsSignup] = useState(false); // Toggle between signup and login forms

  // Load customers from localStorage based on logged-in user
  useEffect(() => {
    if (loggedInUser) {
      const savedCustomers = JSON.parse(localStorage.getItem(`customers_${loggedInUser}`)) || [];
      setCustomers(savedCustomers);
    }
  }, [loggedInUser]);

  // Save customers to localStorage based on logged-in user
  useEffect(() => {
    if (loggedInUser) {
      localStorage.setItem(`customers_${loggedInUser}`, JSON.stringify(customers));
    }
  }, [customers, loggedInUser]);

  const addCustomer = (newCustomer) => {
    setCustomers([...customers, newCustomer]);
  };

  const updateCustomer = (updatedCustomer) => {
    setCustomers(
      customers.map((customer) =>
        customer.id === updatedCustomer.id ? updatedCustomer : customer
      )
    );
    setEditingCustomer(null);
  };

  const deleteCustomer = (id) => {
    setCustomers(customers.filter((customer) => customer.id !== id));
  };

  const handleFilterChange = (value) => setFilter(value);
  const handleSortChange = (value) => setSort(value);

  const filteredCustomers = customers
    .filter((customer) =>
      customer.name.toLowerCase().includes(filter.toLowerCase())
    )
    .sort((a, b) => {
      if (sort === 'name') return a.name.localeCompare(b.name);
      if (sort === 'date') return new Date(a.meetingDate) - new Date(b.meetingDate);
      return 0;
    });

  const handleLogin = (username) => {
    setLoggedInUser(username);
  };

  const handleSignup = () => {
    setIsSignup(false); // Switch to login after signup
  };

  const handleLogout = () => {
    setLoggedInUser(null);
    localStorage.removeItem('loggedInUser');
  };

  return (
    <div className="container">
      <h1 className="text-center my-4">CRM APPLICATION</h1>
      {loggedInUser ? (
        <>
          <Button variant="danger" onClick={handleLogout}>Logout</Button>
          {editingCustomer ? (
            <AddCustomer addCustomer={updateCustomer} customerToEdit={editingCustomer} />
          ) : (
            <AddCustomer addCustomer={addCustomer} />
          )}
          <FilterSort handleFilterChange={handleFilterChange} handleSortChange={handleSortChange} />
          <CustomerList
            customers={filteredCustomers}
            deleteCustomer={deleteCustomer}
            setEditingCustomer={setEditingCustomer}
          />
        </>
      ) : isSignup ? (
        <Signup onSignup={handleSignup} />
      ) : (
        <Login onLogin={handleLogin} />
      )}
      {!loggedInUser && (
        <Button variant="link" onClick={() => setIsSignup(!isSignup)}>
          {isSignup ? 'Already have an account? Login' : "Don't have an account? Signup"}
        </Button>
      )}
    </div>
  );
};

export default App;
