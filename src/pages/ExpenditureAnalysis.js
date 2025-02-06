import React, { useState, useEffect } from 'react';
import { Bar, Pie, Line } from 'react-chartjs-2';
import 'chart.js/auto';

const ExpenditureAnalysis = () => {
  const [expenditures, setExpenditures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const defaultBills = [
    "Electricity bill",
    "Mobile charge",
    "Water bill",
    "Internet bill",
    "Gas bill"
  ];
  useEffect(() => {
    fetch('http://localhost:5000/api/expenditures')  // Fetching from backend
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setExpenditures(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center text-lg">Loading...</p>;
  if (error) return <p className="text-center text-lg text-red-500">Error: {error}</p>;
  if (expenditures.length === 0) return <p className="text-center text-lg">No expenditure data available.</p>;

  const userExpenditures = expenditures[0]?.monthly_expenditures?.flatMap(month => month.expenses) || [];

  const categoryData = userExpenditures.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
    return acc;
  }, {});

  const dates = [...new Set(userExpenditures.map(e => e.date))];
  const dailyTotals = dates.map(date => (
    userExpenditures.filter(e => e.date === date).reduce((sum, e) => sum + e.amount, 0)
  ));

  // Filter expenditures with a note containing 'bill'
  const billNotes = userExpenditures.filter(expense => expense.note && expense.note.toLowerCase().includes('bill'));

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-purple-700">Expenditure Analysis</h2>

      <div className="my-4">
        <h3 className="text-xl font-semibold">Spending by Category</h3>
        <Pie data={{
          labels: Object.keys(categoryData),
          datasets: [{
            data: Object.values(categoryData),
            backgroundColor: ['#A78BFA', '#F472B6', '#34D399', '#60A5FA', '#FBBF24', '#F87171', '#38BDF8']
          }]
        }} />
      </div>

      <div className="my-4">
        <h3 className="text-xl font-semibold">Daily Expenditure Trend</h3>
        <Line data={{
          labels: dates,
          datasets: [{
            label: 'Daily Spend',
            data: dailyTotals,
            borderColor: '#7C3AED',
            backgroundColor: '#C4B5FD'
          }]
        }} />
      </div>

      <div className="my-4">
        <h3 className="text-xl font-semibold">Category-wise Breakdown (Bar)</h3>
        <Bar data={{
          labels: Object.keys(categoryData),
          datasets: [{
            label: 'Total Spent',
            data: Object.values(categoryData),
            backgroundColor: '#F472B6'
          }]
        }} />
      </div>

      {/* TODO List for notes with 'bill' in them */}
      <div>
        <h3>TODO List: </h3>
        {billNotes.length > 0 ? (
          <ul>
            {billNotes.map((expense, index) => (
              <li key={index}>{expense.note}</li>
            ))}
          </ul>
        ) : (
          <div>
            
            <ul>
              {defaultBills.map((bill, index) => (
                <li key={index}>{bill}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpenditureAnalysis;
