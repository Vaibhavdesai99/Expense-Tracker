import React, { useState, useEffect } from "react";

import "./ExpenseForm.css";
const ExpenseForm = ({ onSubmitExpense, selectedExpense, isEditing }) => {
  const [amount, setEnteredAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    if (selectedExpense && isEditing) {
      setEnteredAmount(selectedExpense.amount);
      setDescription(selectedExpense.description);
      setCategory(selectedExpense.category);
    } else {
      setEnteredAmount("");
      setDescription("");
      setCategory("");
    }
  }, [selectedExpense, isEditing]);

  const FormSubmitHandler = async (e) => {
    e.preventDefault();
    const expenses = {
      amount: parseFloat(amount),
      description: description,
      category: category,
    };
    // Passing Data to parent : Expense.js
    onSubmitExpense(expenses);
    // Clear the input fields
    setEnteredAmount("");
    setDescription("");
    setCategory("");

    try {
      const response = await fetch(
        "https://expensetracker-dailyexpenses-default-rtdb.firebaseio.com/DailyExpense.json",
        {
          method: "POST",
          body: JSON.stringify({
            amount: expenses.amount,
            description: expenses.description,
            category: expenses.category,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        const dataId = data.name;
        expenses.id = dataId;
        console.log(dataId);
      } else {
        const error = await response.json();
        console.log(error);
      }
    } catch (error) {
      console.log("ERROR:", error);
    }
  };
  return (
    <div>
      <h2>Add your Daily Expense Here</h2>
      <form onSubmit={FormSubmitHandler}>
        <div className="ExpenseForm">
          <div className="Enteredamount">
            <label>Money Spent</label>
            <input
              value={amount}
              type="number"
              onChange={(e) => setEnteredAmount(e.target.value)}
            />
          </div>
          <div className="Description">
            <label>Description</label>
            <input
              value={description}
              type="text"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="Category">
            <label>Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select Here</option>
              <option value="Food">Food</option>
              <option value="Petrol">Petrol</option>
              <option value="Salary">Salary</option>
              <option value="Shopping">Shopping</option>
            </select>
          </div>
          <button>{isEditing ? "Update Expense" : "Add Expense"}</button>
        </div>
      </form>
    </div>
  );
};

export default ExpenseForm;
