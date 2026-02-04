// File: seedData.js

const mongoose = require('mongoose');
const Expense = require('./models/Expense'); // Make sure the path is correct

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/expenseTracker', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB Connected');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

// Sample data
const expenses = [
  { date: new Date("2024-01-15"), category: "Groceries", amount: 300 },
  { date: new Date("2024-01-20"), category: "Entertainment", amount: 150 },
  { date: new Date("2024-01-25"), category: "Utilities", amount: 100 },
  { date: new Date("2024-02-05"), category: "Rent", amount: 1200 },
  { date: new Date("2024-02-12"), category: "Groceries", amount: 250 },
  { date: new Date("2024-02-18"), category: "Dining", amount: 75 },
  { date: new Date("2024-02-25"), category: "Transportation", amount: 50 },
  { date: new Date("2024-03-01"), category: "Rent", amount: 1200 },
  { date: new Date("2024-03-10"), category: "Groceries", amount: 280 },
  { date: new Date("2024-03-15"), category: "Utilities", amount: 110 },
  { date: new Date("2024-03-20"), category: "Entertainment", amount: 180 },
  { date: new Date("2024-03-30"), category: "Dining", amount: 90 },
  { date: new Date("2024-04-05"), category: "Rent", amount: 1200 },
  { date: new Date("2024-04-10"), category: "Groceries", amount: 320 },
  { date: new Date("2024-04-20"), category: "Utilities", amount: 95 },
  { date: new Date("2024-04-25"), category: "Transportation", amount: 60 }
];

// Insert data into the database
Expense.insertMany(expenses)
  .then(() => {
    console.log('Data successfully inserted!');
    mongoose.connection.close();
  })
  .catch(err => {
    console.error('Error inserting data:', err);
  });
