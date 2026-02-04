const express = require('express');
const router = express.Router();
const { addExpense, getExpenses, deleteExpense, predictExpenses } = require('../controllers/expenseController');

// Make sure these routes use valid callback functions
router.post('/', addExpense); // POST route to add an expense
router.get('/', getExpenses); // GET route to get all expenses
router.delete('/:id', deleteExpense); // DELETE route to delete an expense by ID
router.get('/predict', predictExpenses); // GET route to predict future expenses

module.exports = router;
