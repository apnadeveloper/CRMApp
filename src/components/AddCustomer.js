// src/components/AddCustomer.js
import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';

const AddCustomer = ({ addCustomer, customerToEdit }) => {
  const [customer, setCustomer] = useState({
    name: '',
    phone: '',
    project: '',
    startDate: '',
    endDate: '',
    paymentInstallment: '',
    totalPayment: '',
    installments: [], // Stores multiple installments
    receivedPayment: 0 // Calculated based on installments
  });

  useEffect(() => {
    if (customerToEdit) {
      setCustomer(customerToEdit);
    }
  }, [customerToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer((prevCustomer) => ({
      ...prevCustomer,
      [name]: value
    }));
  };

  const handleAddInstallment = () => {
    // Adds a new installment to the installments array
    if (customer.paymentInstallment) {
      setCustomer((prevCustomer) => ({
        ...prevCustomer,
        installments: [...prevCustomer.installments, Number(prevCustomer.paymentInstallment)],
        paymentInstallment: '' // Clear the input field after adding the installment
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const totalReceived = customer.installments.reduce((acc, curr) => acc + curr, 0);
    const balance = customer.totalPayment - totalReceived;
    const newCustomer = {
      ...customer,
      id: customerToEdit ? customerToEdit.id : Date.now(),
      receivedPayment: totalReceived,
      balance: balance
    };

    addCustomer(newCustomer);

    // Reset the form
    setCustomer({
      name: '',
      phone: '',
      project: '',
      startDate: '',
      endDate: '',
      paymentInstallment: '',
      totalPayment: '',
      installments: [],
      receivedPayment: 0
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2>{customerToEdit ? 'Edit Customer' : 'Add Customer'}</h2>

      <Form.Group>
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={customer.name}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Phone</Form.Label>
        <Form.Control
          type="tel"
          name="phone"
          value={customer.phone}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Project</Form.Label>
        <Form.Control
          type="text"
          name="project"
          value={customer.project}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Start Date</Form.Label>
        <Form.Control
          type="date"
          name="startDate"
          value={customer.startDate}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>End Date</Form.Label>
        <Form.Control
          type="date"
          name="endDate"
          value={customer.endDate}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Total Payment</Form.Label>
        <Form.Control
          type="number"
          name="totalPayment"
          value={customer.totalPayment}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Payment Installment</Form.Label>
        <Form.Control
          type="number"
          name="paymentInstallment"
          value={customer.paymentInstallment}
          onChange={handleChange}
        />
        <Button variant="secondary" onClick={handleAddInstallment} className="mt-2">
          Add Installment
        </Button>
      </Form.Group>

      <h5>Installments Added:</h5>
      <ul>
        {customer.installments.map((installment, index) => (
          <li key={index}>Installment {index + 1}: {installment}</li>
        ))}
      </ul>

      <Button variant="primary" type="submit">
        {customerToEdit ? 'Update Customer' : 'Add Customer'}
      </Button>
    </Form>
  );
};

export default AddCustomer;
