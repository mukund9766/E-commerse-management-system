// CategoryForm.js

import React, { useState } from 'react';
import axios from 'axios';
import './Form.css'


function CategoryForm({ onCategoryAdded }) {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/categories', { name })
      .then(response => {
        onCategoryAdded();
        setName('');
      })
      .catch(error => {
        console.error('Error adding category: ', error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Category Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <button type="submit">Add Category</button>
    </form>
  );
}

export default CategoryForm;
