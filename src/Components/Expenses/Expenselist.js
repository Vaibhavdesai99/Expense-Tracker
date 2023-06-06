import React from "react";
import "./ExpenseList.css";

const ExpenseList = ({ expenses, onDelete, onEdit }) => {
  console.log(expenses);

  const handleDelete = (expenseId) => {
    onDelete(expenseId);
  };
  const handleEdit = (expenseId) => {
    onEdit(expenseId);
  };

  return (
    <div className="ExpenseList">
      <h2>Expenses List :</h2>
      <ul>
        {expenses.map((item, index) => (
          <li key={index} className="ExpenseList-item">
            <span className="ExpenseList-amount">Amount:</span> {item.amount}
            <span className="ExpenseList-description">Description:</span>{" "}
            {item.description}
            <span className="ExpenseList-category">Category:</span>{" "}
            {item.category}
            <button onClick={() => handleDelete(item.id)}>Delete</button>
            <button onClick={() => handleEdit(item.id)}>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;
