// src/components/FilterSort.js
import React from 'react';
import { Form } from 'react-bootstrap';

const FilterSort = ({ handleFilterChange, handleSortChange }) => {
  return (
    <div className="my-3 d-flex justify-content-between">
      <Form.Control
        type="text"
        placeholder="Filter by name"
        onChange={(e) => handleFilterChange(e.target.value)}
        style={{ width: '30%' }}
      />

      <Form.Control as="select" onChange={(e) => handleSortChange(e.target.value)} style={{ width: '30%' }}>
        <option value="">Sort by</option>
        <option value="name">Name</option>
        <option value="date">Meeting Date</option>
      </Form.Control>
    </div>
  );
};

export default FilterSort;
