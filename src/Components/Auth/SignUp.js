import React, { useRef ,useState} from "react";
import "./SignUp.css";

const SignUp = () => {
    const [loadingText, setLoadingText] = useState("");
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
  
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
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyChL1Ble9vYdH4G9vr7sAoWbb69tliAb-s',
        {
          method: 'POST',
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredPassword,
            confirmPassword: enteredConfirmPassword,
            returnSecureToken: true,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        }
       
      );
      console.log(response)
      if (response.ok) {
        const data = await response.json()
        console.log(data.email)
        setSuccessMessage("Successfully created account");
        setLoadingText("");
        setError("");

        // To Clear  Input Fields :
        emailRef.current.value = "";
        passwordRef.current.value = "";
        confirmPassRef.current.value = "";
      
      } else {
        const errorData = await response.json();
        const errorMessage = errorData.error.message;
        console.log(errorMessage);
      
        setError(errorMessage);
        setLoadingText("");
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
            {successMessage && <p className="success-message">{successMessage}</p>}
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
      <div className="secondBox">Have an account ? Login</div>
    </div>
  );
};

export default SignUp;






