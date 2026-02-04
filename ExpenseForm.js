import React, { useState } from 'react';
import axios from 'axios';

function ExpenseForm({ fetchExpenses }) {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      console.log('Token:', token); // Debugging: Log token

      // Check if the token is present
      if (!token) {
        alert('No authentication token found. Please log in.');
        return;
      }

      // Send the request
      const response = await axios.post(
        'http://localhost:5000/api/expenses',
        { amount, category, date },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      // Debugging: Log success response
      console.log('Expense added successfully:', response.data);

      // Clear form fields
      setAmount('');
      setCategory('');
      setDate('');

      // Refresh the expense list
      fetchExpenses();
    } catch (error) {
      // More detailed error logging
      console.error('Error details:', error);
      if (error.response) {
        // Error response from the server
        console.error('Server responded with an error:', error.response.data);
        alert(`Error: ${error.response.data.message || 'Failed to add expense'}`);
      } else if (error.request) {
        // Request was made but no response received
        console.error('No response received from the server');
        alert('No response from the server. Please check your network connection.');
      } else {
        // Something else happened
        console.error('Error:', error.message);
        alert(`Error: ${error.message}`);
      }
    }
  };

  const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
        required
      />
      <input
        type="text"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="Category"
        required
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        max={today} // Restrict future dates
        required
      />
      <button type="submit">Add Expense</button>
    </form>
  );
}

export default ExpenseForm;