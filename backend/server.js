// server.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
const port = 5000;

// MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'ecommerce'
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to MySQL database');
});

app.use(bodyParser.json());
app.use(cors());

// Routes
app.get('/api/categories', (req, res) => {
    // Implement logic to fetch categories from the database
    db.query('SELECT * FROM categories', (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).json(result);
      }
    });
  });
  
  app.post('/api/categories', (req, res) => {
    // Implement logic to create a new category
    const { name } = req.body;
    db.query('INSERT INTO categories (name) VALUES (?)', [name], (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(201).send('Category added successfully');
      }
    });
  });
  
  app.get('/api/products', (req, res) => {
    // Implement logic to fetch products from the database
    db.query('SELECT products.id, products.name AS product_name, categories.name AS category_name, products.category_id FROM products INNER JOIN categories ON products.category_id = categories.id', (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).json(result);
      }
    });
  });
  
  app.post('/api/products', (req, res) => {
    // Implement logic to create a new product
    const { name, category_id } = req.body;
    db.query('INSERT INTO products (name, category_id) VALUES (?, ?)', [name, category_id], (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(201).send('Product added successfully');
      }
    });
  });
  

// Add CRUD operations for categories and products

// GET all categories
app.get('/api/categories', (req, res) => {
    db.query('SELECT * FROM categories', (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(result);
      }
    });
  });
  
  // POST a new category
  app.post('/api/categories', (req, res) => {
    const { name } = req.body;
    db.query('INSERT INTO categories (name) VALUES (?)', [name], (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(201).send('Category added successfully');
      }
    });
  });
  
  // GET all products
  app.get('/api/products', (req, res) => {
    db.query('SELECT products.id, products.name AS product_name, categories.name AS category_name, products.category_id FROM products INNER JOIN categories ON products.category_id = categories.id', (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(result);
      }
    });
  });
  
  // POST a new product
  app.post('/api/products', (req, res) => {
    const { name, category_id } = req.body;
    db.query('INSERT INTO products (name, category_id) VALUES (?, ?)', [name, category_id], (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(201).send('Product added successfully');
      }
    });
  });


// Update and Delete operations for categories and products

// PUT update category by id
app.put('/api/categories/:id', (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  db.query('UPDATE categories SET name = ? WHERE id = ?', [name, id], (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send('Category updated successfully');
    }
  });
});

// DELETE category by id
app.delete('/api/categories/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM categories WHERE id = ?', [id], (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send('Category deleted successfully');
    }
  });
});

// PUT update product by id
app.put('/api/products/:id', (req, res) => {
  const { id } = req.params;
  const { name, category_id } = req.body;
  db.query('UPDATE products SET name = ?, category_id = ? WHERE id = ?', [name, category_id, id], (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send('Product updated successfully');
    }
  });
});

// DELETE product by id
app.delete('/api/products/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM products WHERE id = ?', [id], (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send('Product deleted successfully');
    }
  });
});

  

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
