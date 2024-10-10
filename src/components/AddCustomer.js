import React, { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

const AddCustomer = ({ addCustomer, customerToEdit }) => {
  const [customer, setCustomer] = useState({
    name: '',
    phone: '',
    project: '',
    startDate: '',
    endDate: '',
    paymentInstallment: '',
    totalPayment: '',
    installments: [],
    receivedPayment: 0,
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (customerToEdit) {
      setCustomer(customerToEdit);
    } else {
      setCustomer({
        name: '',
        phone: '',
        project: '',
        startDate: '',
        endDate: '',
        paymentInstallment: '',
        totalPayment: '',
        installments: [],
        receivedPayment: 0,
      });
    }
  }, [customerToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer((prevCustomer) => ({
      ...prevCustomer,
      [name]: value,
    }));
  };

  const handleAddInstallment = () => {
    const installmentAmount = parseFloat(customer.paymentInstallment);
    if (!isNaN(installmentAmount) && installmentAmount > 0) {
      setCustomer((prevCustomer) => ({
        ...prevCustomer,
        installments: [...prevCustomer.installments, installmentAmount],
        paymentInstallment: '',
      }));
    } else {
      setError('Please enter a valid installment amount.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const totalReceived = customer.installments.reduce((acc, curr) => acc + curr, 0);
    const balance = parseFloat(customer.totalPayment) - totalReceived;

    if (balance < 0) {
      setError('Total payment cannot be less than received payments.');
      return;
    }

    const newCustomer = {
      ...customer,
      id: customerToEdit ? customerToEdit.id : Date.now(),
      receivedPayment: totalReceived,
      balance: balance,
    };

    addCustomer(newCustomer);

    if (!customerToEdit) {
      setCustomer({
        name: '',
        phone: '',
        project: '',
        startDate: '',
        endDate: '',
        paymentInstallment: '',
        totalPayment: '',
        installments: [],
        receivedPayment: 0,
      });
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <Form onSubmit={handleSubmit} className="my-4 w-50">
        <h2 className="mt-3">{customerToEdit ? 'Edit Customer' : 'Add Customer'}</h2>
        {error && <Alert variant="danger">{error}</Alert>}

        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={customer.name}
            onChange={handleChange}
            placeholder="Enter customer name"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            type="tel"
            name="phone"
            value={customer.phone}
            onChange={handleChange}
            placeholder="Enter phone number"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Project</Form.Label>
          <Form.Control
            type="text"
            name="project"
            value={customer.project}
            onChange={handleChange}
            placeholder="Enter project name"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Start Date</Form.Label>
          <Form.Control
            type="date"
            name="startDate"
            value={customer.startDate}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>End Date</Form.Label>
          <Form.Control
            type="date"
            name="endDate"
            value={customer.endDate}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Total Payment</Form.Label>
          <Form.Control
            type="number"
            name="totalPayment"
            value={customer.totalPayment}
            onChange={handleChange}
            placeholder="Enter total payment amount"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3 d-flex">
          <Form.Control
            type="number"
            name="paymentInstallment"
            value={customer.paymentInstallment}
            onChange={handleChange}
            placeholder="Enter installment amount"
          />
          <Button variant="secondary" onClick={handleAddInstallment} className="ms-2">
            Add Installment
          </Button>
        </Form.Group>

        <h5>Installments Added:</h5>
        {customer.installments.length > 0 ? (
          <ul>
            {customer.installments.map((installment, index) => (
              <li key={index}>Installment {index + 1}: ${installment.toFixed(2)}</li>
            ))}
          </ul>
        ) : (
          <p>No installments added yet.</p>
        )}

        <Button variant="primary mb-5" type="submit">
          {customerToEdit ? 'Update Customer' : 'Add Customer'}
        </Button>
      </Form>
    </div>
  );
};

export default AddCustomer;
