// App.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'
import CategoryForm from './component/CategoryForm';
import ProductForm from './component/ProductForm';

function App() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  const fetchCategories = () => {
    axios.get('http://localhost:5000/api/categories')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error('Error fetching categories: ', error);
      });
  };

  const fetchProducts = () => {
    axios.get('http://localhost:5000/api/products')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching products: ', error);
      });
  };

  const handleCategoryAdded = () => {
    fetchCategories();
  };

  const handleProductAdded = () => {
    fetchProducts();
  };

  const handleCategoryUpdate = (id, newName) => {
    axios.put(`http://localhost:5000/api/categories/${id}`, { name: newName })
      .then(() => {
        fetchCategories();
      })
      .catch(error => {
        console.error('Error updating category: ', error);
      });
  };

  const handleCategoryDelete = (id) => {
    axios.delete(`http://localhost:5000/api/categories/${id}`)
      .then(() => {
        fetchCategories();
      })
      .catch(error => {
        console.error('Error deleting category: ', error);
      });
  };

  const handleProductUpdate = (id, newName, newCategoryId) => {
    axios.put(`http://localhost:5000/api/products/${id}`, { name: newName, category_id: newCategoryId })
      .then(() => {
        fetchProducts();
      })
      .catch(error => {
        console.error('Error updating product: ', error);
      });
  };

  const handleProductDelete = (id) => {
    axios.delete(`http://localhost:5000/api/products/${id}`)
      .then(() => {
        fetchProducts();
      })
      .catch(error => {
        console.error('Error deleting product: ', error);
      });
  };

  return (
    <div>
      <h1>Categories</h1>
      <CategoryForm onCategoryAdded={handleCategoryAdded} />
      <ul>
        {categories.map(category => (
          <li key={category.id}>
            {category.name}
            <button onClick={() => handleCategoryUpdate(category.id, `${category.name}_updated`)}>Update</button>
            <button onClick={() => handleCategoryDelete(category.id)}>Delete</button>
          </li>
        ))}
      </ul>

      <h1>Products</h1>
      <ProductForm categories={categories} onProductAdded={handleProductAdded} />
      <ul>
        {products.map(product => (
          <li key={product.id}>
            {product.name} - {product.category_name}
            <button onClick={() => handleProductUpdate(product.id, `${product.name}_updated`, product.category_id)}>Update</button>
            <button onClick={() => handleProductDelete(product.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
