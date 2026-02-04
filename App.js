import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Import the new CSS styles
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import Graph from './components/Graph';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [expenses, setExpenses] = useState([]);
  const [regressionLine, setRegressionLine] = useState([]);
  const [predictedAmount, setPredictedAmount] = useState(null);

  useEffect(() => {
    if (token) {
      fetchExpenses();
      fetchPrediction();
    }
  }, [token]);

  const handleSetToken = (newToken) => {
    setToken(newToken);
    localStorage.setItem('token', newToken);
  };

  const fetchExpenses = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/expenses', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setExpenses(response.data);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };

  const fetchPrediction = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/expenses/predict', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setRegressionLine(response.data.regressionLine);
      setPredictedAmount(response.data.predictedAmount);
    } catch (error) {
      console.error('Error fetching prediction:', error);
    }
  };

  const deleteExpense = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/expenses/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setExpenses(expenses.filter(expense => expense._id !== id));
    } catch (error) {
      console.error('Error deleting expense:', error);
    }
  };

  
  return (
    <div className="app-container dark-theme">
      <header className="app-header">
        <h1>Expense Tracker</h1>
      </header>
      <main className="content">
        <ExpenseForm fetchExpenses={fetchExpenses} />
        <ExpenseList expenses={expenses} deleteExpense={deleteExpense} />
        <Graph expenses={expenses} regressionLine={regressionLine} predictedAmount={predictedAmount} />
      </main>
    </div>
  );
}

export default App;
