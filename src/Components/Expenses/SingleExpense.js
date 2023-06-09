import React from "react";
import "./SingleExpense.css";
const SingleExpense = (props) => {
  return (
    <div className="expense-item">
      <li>
        <i>
          {props.category} -- {props.amount} -- {props.description}
        </i>
        <button onClick={() => props.editHandler(props.id)} className="btn">
          Edit
        </button>
        <button onClick={() => props.deleteHandler(props.id)} className="btn">
          Delete
        </button>
        {props.amount > 10000 && (
          <button className="premium-btn">Premium</button>
        )}
      </li>
    </div>
  );
};

export default SingleExpense;
