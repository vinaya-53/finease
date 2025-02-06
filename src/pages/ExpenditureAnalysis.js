import React, { useState } from "react";
import { expenditures } from "../data/expenditure"; // Data import
import { Bar, Pie, Line } from "react-chartjs-2";
import "chart.js/auto";
import "bootstrap/dist/css/bootstrap.min.css";

const ExpenditureAnalysis = () => {
  const [todos, setTodos] = useState([]);

  // Flatten all expenses for a single user (assuming you're analyzing the first user, e.g., "john_doe")
  const userExpenditures = expenditures[0].monthly_expenditures.flatMap(
    (month) => month.expenses
  );

  const categoryData = userExpenditures.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
    return acc;
  }, {});

  const dates = [...new Set(userExpenditures.map((e) => e.date))];
  const dailyTotals = dates.map((date) =>
    userExpenditures
      .filter((e) => e.date === date)
      .reduce((sum, e) => sum + e.amount, 0)
  );

  // Monthly expenses summary
  const getMonthlyExpenses = (month, year) => {
    return userExpenditures.filter((expense) => {
      const date = new Date(expense.date);
      return date.getMonth() === month && date.getFullYear() === year;
    });
  };

  // Monthly summary data (example: January 2025)
  const monthlySummary = (month, year) => {
    const monthlyExpenses = getMonthlyExpenses(month, year);
    const totalMonthSpend = monthlyExpenses.reduce(
      (sum, e) => sum + e.amount,
      0
    );
    const categoryMonthData = monthlyExpenses.reduce((acc, curr) => {
      acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
      return acc;
    }, {});
    return { totalMonthSpend, categoryMonthData };
  };

  // Check for categories with the word 'bill' in the notes
  const billCategories = userExpenditures.filter(
    (e) => e.notes && e.notes.toLowerCase().includes("bill")
  );
  const reminderTodos = billCategories.map((bill) => ({
    task: `Pay the ${bill.category} bill (${bill.amount} ${bill.paymentMethod})`,
    date: bill.date,
  }));

  return (
    <div className="container mt-5">
      <h2 className="text-center text-primary mb-4">Expenditure Analysis</h2>

      <div className="row">
        <div className="col-md-6 mb-4">
          <div
            className="card h-100"
            style={{ maxWidth: "100%", margin: "auto" }}
          >
            <div className="card-body">
              <h3 className="card-title">Spending by Category</h3>
              <Pie
                data={{
                  labels: Object.keys(categoryData),
                  datasets: [
                    {
                      data: Object.values(categoryData),
                      backgroundColor: [
                        "#A78BFA",
                        "#F472B6",
                        "#34D399",
                        "#60A5FA",
                        "#FBBF24",
                        "#F87171",
                        "#38BDF8",
                      ],
                    },
                  ],
                }}
              />
            </div>
          </div>
        </div>

        <div className="col-md-6 mb-4 d-flex flex-column">
          <div className="card flex-fill mb-4" style={{ maxWidth: "100%" }}>
            <div className="card-body">
              <h3 className="card-title">Daily Expenditure Trend</h3>
              <Line
                data={{
                  labels: dates,
                  datasets: [
                    {
                      label: "Daily Spend",
                      data: dailyTotals,
                      borderColor: "#7C3AED",
                      backgroundColor: "#C4B5FD",
                    },
                  ],
                }}
              />
            </div>
          </div>

          <div className="card flex-fill" style={{ maxWidth: "100%" }}>
            <div className="card-body">
              <h3 className="card-title">Category-wise Breakdown (Bar)</h3>
              <Bar
                data={{
                  labels: Object.keys(categoryData),
                  datasets: [
                    {
                      label: "Total Spent",
                      data: Object.values(categoryData),
                      backgroundColor: "#F472B6",
                    },
                  ],
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="my-4">
        <h3 className="text-xl font-semibold">
          Monthly Expenses (January 2025)
        </h3>
        <div className="my-2">
          <p>
            <strong>Total Spend in January 2025:</strong>{" "}
            {monthlySummary(0, 2025).totalMonthSpend}
          </p>
          <p>
            <strong>Category Breakdown for January 2025:</strong>
          </p>
          <ul>
            {Object.entries(monthlySummary(0, 2025).categoryMonthData).map(
              ([category, amount]) => (
                <li key={category}>
                  {category}: {amount}
                </li>
              )
            )}
          </ul>
        </div>
      </div>

      <div className="my-4">
        <h3 className="text-xl font-semibold">To-Do List: Bills</h3>
        {reminderTodos.length > 0 ? (
          <ul>
            {reminderTodos.map((todo, index) => (
              <li key={index} className="text-lg">
                {todo.task} (due: {todo.date})
              </li>
            ))}
          </ul>
        ) : (
          <p>No bills due at the moment.</p>
        )}
      </div>
    </div>
  );
};

export default ExpenditureAnalysis;
