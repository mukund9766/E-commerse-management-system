// ProductForm.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Form.css'

function ProductForm({ categories, onProductAdded }) {
  const [name, setName] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categoryOptions, setCategoryOptions] = useState([]);

  useEffect(() => {
    setCategoryOptions(categories.map(category => (
      <option key={category.id} value={category.id}>{category.name}</option>
    )));
  }, [categories]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/products', { name, category_id: categoryId })
      .then(response => {
        onProductAdded();
        setName('');
        setCategoryId('');
      })
      .catch(error => {
        console.error('Error adding product: ', error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Product Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <label>
        Category:
        <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
          <option value="">Select Category</option>
          {categoryOptions}
        </select>
      </label>
      <button type="submit">Add Product</button>
    </form>
  );
}

export default ProductForm;
