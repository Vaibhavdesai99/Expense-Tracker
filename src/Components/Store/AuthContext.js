import React, { useState } from "react";

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  // To delete individual expense:
  // setDataId: (dataId) => {},
  login: (token) => {},
  logout: () => {},
});

export const AuthProvider = ({ children }) => {
  const initialToken = localStorage.getItem("token");
  const [token, setToken] = useState(initialToken);
  // const [dataId, setDataId] = useState("");
  const userisLoggedIn = !!token;

  //Storing the token to localStorage :
  const loginHandler = (token) => {
    setToken(token);
    localStorage.setItem("token", token);
  };

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  // const setDataIdHandler = (id) => {
  //   setDataId(id);
  // };
  const contextValue = {
    token: token,
    isLoggedIn: userisLoggedIn,
    // setDataId: setDataIdHandler,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
