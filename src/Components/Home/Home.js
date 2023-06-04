import React, { useContext } from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import AuthContext from "../Store/AuthContext";
const Home = () => {
  const authCtx = useContext(AuthContext);
  const idToken = authCtx.token;
  // console.log(idToken);

  // verify Email Handler :
  const EmailVerifire = async () => {
    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyChL1Ble9vYdH4G9vr7sAoWbb69tliAb-s",
        {
          method: "POST",
          body: JSON.stringify({
            requestType: "VERIFY_EMAIL",
            idToken: idToken,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        const emailverified = data.email;
        alert("Email Verified Successfully");
        console.log("email Verified: =>", emailverified);
      } else {
        const error = await response.json();
        alert("Something Wrong:", error.message);
        throw new Error(error.message);
      }
    } catch (error) {
      console.log("error message", error.message);
    }
  };

  return (
    <>
      <div className="main_div">
        Welcome To Expense Tracker
        <div className="complete_profile">
          <div className="rightSide">
            Your Profile is incomplete
            <Link to="/Profile">
              <button
                style={{
                  color: "white",
                  background: "red",
                  borderRadius: "5px",
                }}
              >
                Complete Now
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div
        className="emailVerifier"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "5rem",
        }}
      >
        <h1 style={{ color: "red" }}>Verify Your Email Here...!</h1>
        <button
          style={{
            padding: "3px 9px",
            backgroundColor: "red",
            color: "white",
            borderRadius: "5px",
          }}
          onClick={EmailVerifire}
        >
          Verify Email
        </button>
      </div>
    </>
  );
};
export default Home;
