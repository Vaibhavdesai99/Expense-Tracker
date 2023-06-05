import React, { useRef } from "react";
import { Link } from "react-router-dom";
import "./ForgetPassWord.css";

const ForgetPassword = () => {
  const emailChangeForForgetPassHandler = useRef();

  const sendLinkHandler = async () => {
    const EmailLink = emailChangeForForgetPassHandler.current.value;

    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyChL1Ble9vYdH4G9vr7sAoWbb69tliAb-s",
      {
        method: "POST",
        body: JSON.stringify({
          requestType: "PASSWORD_RESET",
          email: EmailLink,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      alert("Reset link sent to your email.");

      //   To clear Input Fields :
      emailChangeForForgetPassHandler.current.value = "";
    }
  };

  return (
    <div className="forgetPass">
      <div className="form-title">Reset Password</div>
      <div className="form-description">
        Enter the email address associated with your account to receive a
        password reset link.
      </div>
      <div className="inputBox">
        <input
          type="text"
          placeholder="Email"
          ref={emailChangeForForgetPassHandler}
          className="email-input"
        />
      </div>
      <button className="send-link-btn" onClick={sendLinkHandler}>
        Send Link
      </button>
      <div className="login-link">
        <Link to="/LogIn">Already a user? Login</Link>
      </div>
    </div>
  );
};

export default ForgetPassword;
