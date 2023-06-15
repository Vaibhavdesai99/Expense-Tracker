import React, { useRef, useState } from "react";
import "./LogIn.css";

import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import AuthContext from "../Store/AuthContext";

import { useDispatch } from "react-redux";
import { authStates } from "../StoreRedux/auth-reducer";

const LogIn = () => {
  const dispatch = useDispatch();

  const [loadingText, setLoadingText] = useState("");
  const [error, setError] = useState("");
  // const authCtx = useContext(AuthContext);
  const naviagte = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();

  const formSubmitHandler = async (e) => {
    e.preventDefault();

    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;
    setLoadingText("...Loading");

    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyChL1Ble9vYdH4G9vr7sAoWbb69tliAb-s",
        {
          method: "POST",
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredPassword,
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
        console.log(data);

        localStorage.setItem("token", data.idToken);
        localStorage.setItem("userID", data.localId);
        localStorage.setItem("email", data.email);
        naviagte("/Home");
        // Dispatch the setLogin action to update the isLoggedIn state to true
        dispatch(authStates.setLogin(true));

        // Passing token to login context then in that we store that token to localStorage
        // authCtx.login(data.idToken);
        alert("Successfully Logged In ");
        setLoadingText("");
        setError("");

        // To Clear  Input Fields :
        emailRef.current.value = "";
        passwordRef.current.value = "";
      } else {
        const errorData = await response.json();
        console.log(errorData);
        const errorMessage = errorData.error.message;
        console.log(errorMessage);

        setError(errorMessage);
        setLoadingText("");

        dispatch(authStates.setLogin(false));
      }
    } catch (error) {
      setError("Network or other error occurred");
      setLoadingText("");
    }
  };

  return (
    <div>
      <form className="MainForm" onSubmit={formSubmitHandler}>
        <h2>LogIn</h2>
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
          {error && <p>{error}</p>}
          <div className="SignUpBtn">
            {!loadingText ? (
              <button type="submit">LogIn</button>
            ) : (
              <p>{loadingText}</p>
            )}
          </div>
          <div className="forgetPass">
            <Link to="/ForgetPassWord">Forget Password</Link>
          </div>
        </div>
      </form>
      <div className="secondBox">
        <Link to="/SignUp">Don't Have an account ? SignUp</Link>
      </div>
    </div>
  );
};

export default LogIn;
