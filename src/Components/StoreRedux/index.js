import { configureStore } from "@reduxjs/toolkit";

import expenseReducer from "./expense-Reducer";

import authReducer from "./auth-reducer";

import themeReducer from "./theme-Reducer";

const store = configureStore({
  reducer: { auth: authReducer, expense: expenseReducer, theme: themeReducer },
});

export default store;
