import React from "react";
import "./SingleExpense.css";
import { useDispatch } from "react-redux";
import { toggleTheme } from "../StoreRedux/theme-Reducer";
const SingleExpense = (props) => {
  const dispatch = useDispatch();

  const handelTogglebutton = () => {
    dispatch(toggleTheme());
  };
  return (
    <tr className="expense-item">
      <th>
        <th>Category:-</th>
        <td>{props.category}</td>
      </th>
      <th>
        <td>Amount:-</td>
        <td>{props.amount}</td>
      </th>
      <th>
        <td>Description:-</td>
        <td>{props.description}</td>
      </th>

      <td>
        <button onClick={() => props.editHandler(props.id)} className="btn">
          Edit
        </button>
      </td>
      <td>
        <button onClick={() => props.deleteHandler(props.id)} className="btn">
          Delete
        </button>
      </td>
      <td>
        {props.amount > 1000 && (
          <button onClick={handelTogglebutton} className="premium-btn">
            Premium
          </button>
        )}
      </td>
    </tr>
  );
};

export default SingleExpense;
