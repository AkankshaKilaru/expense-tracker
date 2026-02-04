// backend/ml/linearRegression.js
const mongoose = require("mongoose");
const SimpleLinearRegression = require("ml-regression-simple-linear");
const Expense = require("../models/Expense");

async function predictNextMonthExpense() {
  try {
    // Fetch all expenses from MongoDB and sort by date
    const expenses = await Expense.find().sort({ date: 1 });

    if (expenses.length < 2) {
      throw new Error("Insufficient data to train the model.");
    }

    // Prepare data for the model
    const months = [];
    const amounts = [];
    let monthCounter = 1;

    expenses.forEach((expense) => {
      months.push(monthCounter++);
      amounts.push(expense.amount);
    });

    // Train the linear regression model
    const regression = new SimpleLinearRegression(months, amounts);
    console.log("Model trained successfully.");

    // Predict the expense for the next month
    const nextMonth = months.length + 1;
    const predictedExpense = regression.predict(nextMonth);

    console.log(`Predicted expense for next month: $${predictedExpense.toFixed(2)}`);
    return predictedExpense.toFixed(2);
  } catch (error) {
    console.error("Error in linearRegression.js:", error);
    throw error;
  }
}

module.exports = predictNextMonthExpense;
