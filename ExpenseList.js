import React from 'react';

function ExpenseList({ expenses = [], deleteExpense }) {
  return (
    <div className="expense-list">
      <h2>Expenses</h2>
      {expenses.length === 0 ? (
        <p>No expenses yet.</p>
      ) : (
        <ul className="expense-items">
          {expenses.map((expense) => (
            <li key={expense._id} className="expense-item">
              <div className="expense-details">
                <span>{new Date(expense.date).toLocaleDateString()} - {expense.category}: ${expense.amount}</span>
              </div>
              <button className="delete-button" onClick={() => deleteExpense(expense._id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ExpenseList;
