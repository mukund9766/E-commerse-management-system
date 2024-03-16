const express = require('express');
const router = express.Router();
const db = require('./db');

router.get('/categories', async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const offset = (page - 1) * limit;

    const [categories] = await db.query('SELECT * FROM categories LIMIT ?, ?', [offset, limit]);
    res.json(categories);
});

router.post('/categories', async (req, res) => {
    const { name } = req.body;
    const [result] = await db.query('INSERT INTO categories (name) VALUES (?)', [name]);
    res.json({ id: result.insertId });
});

router.get('/categories/:id', async (req, res) => {
    const [category] = await db.query('SELECT * FROM categories WHERE id = ?', [req.params.id]);
    res.json(category[0]);
});

router.put('/categories/:id', async (req, res) => {
    const { name } = req.body;
    await db.query('UPDATE categories SET name = ? WHERE id = ?', [name, req.params.id]);
    res.sendStatus(200);
});

router.delete('/categories/:id', async (req, res) => {
    await db.query('DELETE FROM categories WHERE id = ?', [req.params.id]);
    res.sendStatus(200);
});

// Repeat the above code for products with the following query:
// SELECT p.*, c.name AS category_name FROM products p JOIN categories c ON p.category_id = c.id

module.exports = router;