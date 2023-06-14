import React, { useRef, useState } from "react";
import "./SignUp.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { authStates } from "../StoreRedux/auth-reducer";

const SignUp = () => {
  const dispatch = useDispatch();
  // const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const [loadingText, setLoadingText] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPassRef = useRef();

  const formSubmitHandler = async (e) => {
    e.preventDefault();

    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;
    const enteredConfirmPassword = confirmPassRef.current.value;

    if (enteredPassword !== enteredConfirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoadingText("...Loading");

    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyChL1Ble9vYdH4G9vr7sAoWbb69tliAb-s",
        {
          method: "POST",
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredPassword,
            confirmPassword: enteredConfirmPassword,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      if (response.ok) {
        const data = await response.json();
        navigate("/LogIn");
        console.log(data);
        console.log(data);
        // localStorage.setItem("idToken", data.idToken);
        // localStorage.setItem("userID", data.localId);
        alert("Successfully created account");
        setLoadingText("");
        setError("");

        // To Clear  Input Fields :
        emailRef.current.value = "";
        passwordRef.current.value = "";
        confirmPassRef.current.value = "";

        // Dispatch the setLogin action to update the isLoggedIn state to true
        dispatch(authStates.setLogin(true));
      } else {
        const errorData = await response.json();
        console.log(errorData);
        const errorMessage = errorData.error.message;
        console.log(errorMessage);

        setError(errorMessage);
        setLoadingText("");
        setSuccessMessage("");

        //Dispatch the setLogin action to update the isLoggedIn state to false
        dispatch(authStates.setLogin(false));
      }
    } catch (error) {
      console.log(error);
      setError("Network or other error occurred");
      setLoadingText("");
    }
  };

  return (
    <div>
      <form className="MainForm" onSubmit={formSubmitHandler}>
        <h2>SignUp</h2>
        <div className="formBody">
          <div className="email">
            <label className="email_label">Email</label>
            <input type="email" placeholder="email" ref={emailRef} required />
          </div>
          <div className="password">
            <label className="password_label">Password</label>
            <input
              type="password"
              placeholder="password"
              ref={passwordRef}
              required
            />
          </div>
          <div className="confirmPassword">
            <label className="confirmPassword_label">Confirm Password</label>
            <input
              type="password"
              placeholder="confirmPassword"
              ref={confirmPassRef}
              required
            />
            {error && <p className="error-message">{error}</p>}
            {successMessage && (
              <p className="success-message">{successMessage}</p>
            )}
          </div>
          <div className="SignUpBtn">
            {!loadingText ? (
              <button type="submit">SignUp</button>
            ) : (
              <p>{loadingText}</p>
            )}
          </div>
        </div>
      </form>
      <div className="secondBox">
        <Link to="/LogIn">Have an account ? Login</Link>
      </div>
    </div>
  );
};

export default SignUp;
