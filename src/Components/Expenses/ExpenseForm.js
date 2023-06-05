import React, { useState } from "react";
import "./ExpenseForm.css";
const ExpenseForm = ({ onSubmitExpense }) => {
  // console.log(onSubmitExpense);
  const [amount, setEnteredAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const FormSubmitHandler = (e) => {
    e.preventDefault();
    const expenses = {
      amount: parseFloat(amount),
      description: description,
      category: category,
    };
    onSubmitExpense(expenses);
    // console.log(expenses);
    // Clear the input fields
    setEnteredAmount("");
    setDescription("");
    setCategory("");
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
          <button>Add Expense</button>
        </div>
      </form>
    </div>
  );
};

export default ExpenseForm;
