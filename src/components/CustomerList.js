// src/components/CustomerList.js
import React from 'react';
import { Button, Table } from 'react-bootstrap';

const CustomerList = ({ customers = [], deleteCustomer, setEditingCustomer }) => {
  if (!Array.isArray(customers) || customers.length === 0) {
    return <p className="text-center">No customers available.</p>;
  }

  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>Name</th>
          <th>Phone</th>
          <th>Project</th>
          <th>Start Date</th>
          <th>End Date</th>
          <th>Total Payment</th>
          <th>Received Payment</th>
          <th>Balance</th>
          <th>Installments</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {customers.map((customer) => (
          <tr key={customer.id}>
            <td>{customer.name}</td>
            <td>{customer.phone}</td>
            <td>{customer.project}</td>
            <td>{customer.startDate}</td>
            <td>{customer.endDate}</td>
            <td>{customer.totalPayment}</td>
            <td>{customer.receivedPayment}</td>
            <td>{customer.balance}</td>
            <td>
              {customer.installments && customer.installments.length > 0 ? (
                customer.installments.map((installment, index) => (
                  <div key={index}>Installment {index + 1}: {installment}</div>
                ))
              ) : (
                <span>No Installments</span>
              )}
            </td>
            <td>
              <Button
                variant="warning"
                onClick={() => setEditingCustomer(customer)}
                className="me-2"
              >
                Edit
              </Button>
              <Button
                variant="danger"
                onClick={() => deleteCustomer(customer.id)}
              >
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default CustomerList;
