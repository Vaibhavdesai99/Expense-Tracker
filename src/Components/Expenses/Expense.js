import React, { useEffect, useState } from "react";
import "./Expense.css";
import ExpenseForm from "./ExpenseForm";
import Expenselist from "./Expenselist";
const Expense = () => {
  const [expenses, setExpenses] = useState([]);
  const getDataFromFireBase = async () => {
    const response = await fetch(
      "https://expensetracker-dailyexpenses-default-rtdb.firebaseio.com/DailyExpense.json"
    );

    if (response.ok) {
      const data = await response.json();
      const expenseData = Object.values(data);

      setExpenses(expenseData);
    }
  };

  useEffect(() => {
    getDataFromFireBase();
  }, []);

  const submitHandler = (expense) => {
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
