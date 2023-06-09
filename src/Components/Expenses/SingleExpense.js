import React from "react";
import "./SingleExpense.css";

const SingleExpense = (props) => {
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
        {props.amount > 10000 && (
          <button className="premium-btn">Premium</button>
        )}
      </td>
    </tr>
  );
};

export default SingleExpense;
