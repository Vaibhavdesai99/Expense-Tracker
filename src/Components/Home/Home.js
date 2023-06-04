import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div className="main_div">
      Welcome To Expense Tracker
      <div className="complete_profile">
        <div className="rightSide">
          Your Profile is incomplete
          <Link to="/Profile">
            <button
              style={{ color: "white", background: "red", borderRadius: "5px" }}
            >
              Complete Now{" "}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
