import React from "react";
import "./ExpenseList.css";

const ExpenseList = ({ expense }) => {
  return (
    <div className="ExpenseList">
      <h2>Expenses List :</h2>
      <ul>
        {expense.map((item, index) => (
          <li key={index} className="ExpenseList-item">
            <span className="ExpenseList-amount">Amount:</span> {item.amount}
            <span className="ExpenseList-description">Description:</span>{" "}
            {item.description}
            <span className="ExpenseList-category">Category:</span>{" "}
            {item.category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;
