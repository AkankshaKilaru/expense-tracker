// File: frontend/src/components/Graph.js

import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import './Graph.css'; // Import the custom CSS file

function Graph({ expenses = [], regressionLine = [], predictedAmount }) {
  // Extract dates and amounts for the actual expenses
  const dates = expenses.map(exp => new Date(exp.date).toLocaleDateString());
  const amounts = expenses.map(exp => exp.amount);

  // Extract dates and predicted amounts for the regression line
  const regressionDates = regressionLine.map(point => point.date);
  const regressionAmounts = regressionLine.map(point => point.predicted);

  // Prepare the data for the Line graph
  const data = {
    labels: dates,
    datasets: [
      {
        label: 'Actual Expenses',
        data: amounts,
        borderColor: '#4CAF50', // Green color for actual expenses
        backgroundColor: 'rgba(76, 175, 80, 0.2)',
        fill: true,
        tension: 0.4 // Add a smooth curve to the line
      },
      {
        label: 'Predicted Expenses',
        data: regressionAmounts,
        borderColor: '#FF5722', // Orange color for predicted expenses
        backgroundColor: 'rgba(255, 87, 34, 0.2)',
        fill: true,
        tension: 0.4
      }
    ]
  };

  return (
    <div className="graph-container">
      <h2>Expense Overview</h2>
      <Line data={data} />
      {predictedAmount && (
        <div className="predicted-expense">
          <strong>Predicted Expense for Next Month:</strong>
          <span> ${predictedAmount.toFixed(2)}</span>
        </div>
      )}
    </div>
  );
}

export default Graph;
