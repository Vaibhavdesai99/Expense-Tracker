import { createSlice } from "@reduxjs/toolkit";

const useridToken = localStorage.getItem("idToken")
  ? localStorage.getItem("idToken")
  : "";
const userLocalID = localStorage.getItem("userID")
  ? localStorage.getItem("userID")
  : "";

const initialState = {
  isLoggedIn: !!useridToken,
  idToken: useridToken,
  userID: userLocalID,
  isEmailVerified: false,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin(state, action) {
      state.isLoggedIn = action.payload;
    },
    setIdToken(state, action) {
      state.idToken = action.payload;
    },
    setUserID(state, action) {
      state.userID = action.payload;
    },
    setEmailVerified(state, action) {
      state.isEmailVerified = action.payload;
    },
    logOut(state) {
      state.isLoggedIn = false;
      state.idToken = "";
      state.userID = "";
      state.isEmailVerified = false;
      localStorage.removeItem("idToken");
      localStorage.removeItem("userID");
    },
  },
});

const authReducer = authSlice.reducer;
export const authStates = authSlice.actions;
export default authReducer;
