import React, { useState, useEffect, useCallback } from "react";
import "./Expenses.css";
import SingleExpense from "./SingleExpense";
import { useDispatch } from "react-redux";
import { expenseAction } from "../StoreRedux/expense-Reducer";
import { CSVLink } from "react-csv";

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [isEdit, setEdit] = useState(false);
  const [expenseId, setExpenseId] = useState(null);
  const [csvData, setCsv] = useState("No data Currently");
  const initialState = () => {
    const value = "Food";
    return value;
  };
  const [category, setCategory] = useState(initialState);
  const dispatch = useDispatch();

  const userID = localStorage.getItem("userID");
  // console.log(userID);
  const categoryHandler = (event) => {
    setCategory(event.target.value);
  };

  const getExpenses = useCallback(async () => {
    try {
      const response = await fetch(
        `https://expensedemodailyexp-default-rtdb.firebaseio.com/${userID}.json`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        const data = await response.json();
        let errorMessage = "Authentication Failed";
        if (data && data.error && data.error.message) {
          errorMessage = data.error.message;
        }
        throw new Error(errorMessage);
      }
      const data = await response.json();
      // console.log(data);
      let arr = [];
      for (let key in data) {
        // console.log(key);
        arr.push({
          id: key,
          description: data[key].description,
          amount: data[key].amount,
          category: data[key].category,
        });
      }
      setCsv(arr);
      setExpenses(arr);
      localStorage.setItem("allExpense", JSON.stringify(arr));
      dispatch(expenseAction.addExpenses(expenses));
    } catch (err) {
      console.log(err);
    }
  }, [dispatch, userID, expenses]);

  const expenseFormHandler = async (event) => {
    event.preventDefault();
    if (isEdit === true) {
      const data = {
        amount: amount,
        description: description,
        category: category,
      };
      dispatch(expenseAction.addAmount(amount));
      dispatch(expenseAction.addDesc(description));
      dispatch(expenseAction.addCategory(category));
      try {
        const response = await fetch(
          `https://expensedemodailyexp-default-rtdb.firebaseio.com/${userID}/${expenseId}.json`,
          {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response);
        getExpenses();
        setAmount(0);
        setDescription("");
        setCategory(initialState);
      } catch (err) {
        alert(err);
      }
    } else {
      const data = {
        amount: amount,
        description: description,
        category: category,
      };
      dispatch(expenseAction.addAmount(amount));
      dispatch(expenseAction.addDesc(description));
      dispatch(expenseAction.addCategory(category));
      try {
        const response = await fetch(
          `https://expensedemodailyexp-default-rtdb.firebaseio.com/${userID}.json`,
          {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response);
        setAmount(0);
        setDescription("");
        setCategory(initialState);
        getExpenses();
      } catch (err) {
        alert(err);
      }
    }

    setExpenses((prevExp) => {
      let newExpense = [...prevExp];
      newExpense.push(expenses);
      return newExpense;
    });
  };

  const editHandler = (id) => {
    let editExpense = expenses.filter((expense) => {
      return expense.id === id;
    });
    setEdit(true);
    setExpenseId(id);
    setAmount(editExpense[0].amount);
    setDescription(editExpense[0].description);
    setCategory(editExpense[0].category);
    console.log(editExpense);
  };

  const deleteHandler = async (id) => {
    try {
      const response = await fetch(
        `https://expensedemodailyexp-default-rtdb.firebaseio.com/${userID}/${id}.json`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      getExpenses();
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    getExpenses();
  }, [getExpenses]);

  let header = [
    {
      label: "Amount",
      key: "amount",
    },
    {
      label: "Description",
      key: "description",
    },
    {
      label: "Category",
      key: "category",
    },
  ];

  return (
    <>
      <div className="form-container">
        <form onSubmit={expenseFormHandler} className="expense-form">
          <div className="form-input">
            <label>Enter Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
              className="amount-input"
            />
          </div>
          <div>
            <label>Description</label>
            <input
              type="text"
              value={description}
              placeholder="Enter description"
              onChange={(event) => setDescription(event.target.value)}
              required
              className="description-input"
            />
          </div>
          <div>
            <label>Add Category</label>
            <select
              className="category-select"
              id="category"
              onChange={categoryHandler}
              value={category}
            >
              <option value="Food">Food</option>
              <option value="Petrol">Petrol</option>
              <option value="Salary">Salary</option>
            </select>
          </div>

          <div className="add-expense-container">
            <button className="add-expense-button">Add Expense</button>
          </div>
        </form>
        <hr></hr>
        <button className="download-csv-button">
          <CSVLink data={csvData} headers={header} filename={"expenses.csv"}>
            Download File
          </CSVLink>
        </button>
      </div>

      <div className="expense-list-container">
        {expenses.map((expense, index) => {
          return (
            <SingleExpense
              id={expense.id}
              key={index}
              amount={expense.amount}
              description={expense.description}
              category={expense.category}
              editHandler={editHandler}
              deleteHandler={deleteHandler}
            />
          );
        })}
      </div>
    </>
  );
};

export default Expenses;
