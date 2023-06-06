import React, { useEffect, useState } from "react";
import "./Expense.css";
import ExpenseForm from "./ExpenseForm";
import ExpenseList from "./Expenselist";

const Expense = () => {
  const [expenses, setExpenses] = useState([]);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const submitHandler = async (expense) => {
    if (isEditing && selectedExpense) {
      const updatedExpenses = expenses.map((item) => {
        if (item.id === selectedExpense.id) {
          return {
            ...item,
            amount: expense.amount,
            description: expense.description,
            category: expense.category,
          };
        }
        return item;
      });

      try {
        const response = await fetch(
          `https://expensetracker-dailyexpenses-default-rtdb.firebaseio.com/DailyExpense/${selectedExpense.id}.json`,
          {
            method: "PUT",
            body: JSON.stringify({
              id: selectedExpense.id,
              amount: expense.amount,
              description: expense.description,
              category: expense.category,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          setExpenses(updatedExpenses);
          setSelectedExpense(null);
          setIsEditing(false);
          console.log("Expense successfully updated");
        } else {
          console.log("Failed to update expense");
        }
      } catch (error) {
        console.log("ERROR:", error);
      }
    } else {
      setExpenses((prevExpenses) => [...prevExpenses, expense]);
    }
  };

  const editExpense = (expenseId) => {
    const expenseToEdit = expenses.find((item) => item.id === expenseId);
    setSelectedExpense(expenseToEdit);
    setIsEditing(true);
  };

  // Delete expenses :
  const deleteExpense = async (expenseId) => {
    try {
      const response = await fetch(
        `https://expensetracker-dailyexpenses-default-rtdb.firebaseio.com/DailyExpense/${expenseId}.json`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        setExpenses((prevExpenses) =>
          prevExpenses.filter((expense) => expense.id !== expenseId)
        );
        console.log("Expense successfully deleted");
      } else {
        console.log("Failed to delete expense");
      }
    } catch (error) {
      console.log("ERROR:", error);
    }
  };

  // Get data from database:
  //
  const getDataFromFirebase = async () => {
    try {
      const response = await fetch(
        "https://expensetracker-dailyexpenses-default-rtdb.firebaseio.com/DailyExpense.json"
      );

      if (response.ok) {
        const data = await response.json();
        const expenseData = Object.entries(data).map(([id, expense]) => ({
          id: id,
          ...expense,
        }));

        setExpenses(expenseData);
        console.log(expenseData);
      } else {
        console.log("Failed to fetch expense data");
      }
    } catch (error) {
      console.log("ERROR:", error);
    }
  };

  useEffect(() => {
    getDataFromFirebase();
  }, []);

  return (
    <div>
      <ExpenseForm
        onSubmitExpense={submitHandler}
        selectedExpense={selectedExpense}
        isEditing={isEditing}
      />
      <ExpenseList
        expenses={expenses}
        onDelete={deleteExpense}
        onEdit={editExpense}
      />
    </div>
  );
};

export default Expense;
