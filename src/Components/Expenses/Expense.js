import React, { useState } from "react";
import "./Expense.css";
import ExpenseForm from "./ExpenseForm";
import Expenselist from "./Expenselist";
const Expense = () => {
  const [expenses, setExpenses] = useState([]);
  const submitHandler = (expense) => {
    console.log(expense);
    setExpenses((prevExpenses) => [...prevExpenses, expense]);
  };
  console.log(submitHandler);
  return (
    <div>
      <ExpenseForm onSubmitExpense={submitHandler} />
      <Expenselist expense={expenses} />
    </div>
  );
};

export default Expense;
