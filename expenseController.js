const Expense = require('../models/Expense');
const SimpleLinearRegression = require('ml-regression-simple-linear');

// Add a new expense
exports.addExpense = async (req, res) => {
  try {
    const { amount, category, date } = req.body;
    const expense = new Expense({ amount, category, date });
    await expense.save();
    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all expenses
exports.getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete an expense by ID
exports.deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const expense = await Expense.findByIdAndDelete(id);
    if (!expense) return res.status(404).json({ message: 'Expense not found' });
    res.status(200).json({ message: 'Expense deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Predict future expenses using linear regression
exports.predictExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find().sort({ date: 1 });
    if (expenses.length < 2) {
      return res.status(400).json({ message: 'Not enough data for prediction.' });
    }

    const dates = expenses.map(exp => new Date(exp.date).getTime());
    const amounts = expenses.map(exp => exp.amount);
    const regression = new SimpleLinearRegression(dates, amounts);

    const futureDate = new Date().setMonth(new Date().getMonth() + 1);
    let predictedAmount = regression.predict(futureDate);
    predictedAmount = Math.max(predictedAmount, 0); // Clamp to zero if negative

    const regressionLine = expenses.map(exp => ({
      date: new Date(exp.date).toLocaleDateString(),
      predicted: Math.max(regression.predict(new Date(exp.date).getTime()), 0)
    }));

    res.status(200).json({ regressionLine, predictedAmount });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
