import React from "react";
import "./About.css";
import expenseImage from "../Images/Blog-what-is-exp-manager.jpg";

const About = () => {
  return (
    <div className="aboutContainer">
      <div className="imageContainer">
        <img src={expenseImage} alt="Expense" className="expenseImage" />
      </div>
      <div className="textContainer">
        <h1>About</h1>
        <p>
          When you track your expenses, you can save better and invest for your
          future. Spending aimlessly does not give you leeway to save and invest
          for your future.
        </p>
        <p>
          The way to use a daily expense manager is, well, daily. Map your
          spending for 30 days and then multiply it by 12. That will give you
          the amount you spend annually. It can be an eye-opening experience,
          and you will immediately start working to reduce that amount. By
          tracking your expenses with a reliable money management app, not only
          can you save money, you can also set financial goals for yourself so
          that you can create a nest egg for emergencies and the future.
        </p>
      </div>
    </div>
  );
};

export default About;
