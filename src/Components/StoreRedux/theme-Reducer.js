import { createSlice } from "@reduxjs/toolkit";

const ThemeSlice = createSlice({
  name: "Theme",
  initialState: "light",
  reducers: {
    toggleTheme(state) {
      return (state = state === "light" ? "Dark" : "light");
    },
  },
});

const themeReducer = ThemeSlice.reducer;
export default themeReducer;

export const { toggleTheme } = ThemeSlice.actions;
