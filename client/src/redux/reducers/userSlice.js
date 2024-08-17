import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    /**
     * Updates the current user in the state.
     *
     * @param {Object} state - The current state.
     * @param {Object} action - The action containing the new user data.
     * @return {void}
     */
    updateUser: (state, action) => {
      state.currentUser = action.payload.user;
    },
    /**
     * Updates the current user in the state and saves the token in local storage.
     *
     * @param {Object} state - The current state.
     * @param {Object} action - The action containing the new user data and token.
     * @return {void}
     */
    loginSuccess: (state, action) => {
      state.currentUser = action.payload.user;
      localStorage.setItem("krist-app-token", action.payload.token);
    },
    /**
     * Logs the user out by clearing the current user and removing the token from local storage.
     *
     * @param {Object} state - The current state.
     * @return {void}
     */
    logout: (state) => {
      state.currentUser = null;
      localStorage.removeItem("krist-app-token");
    },
  },
});

export const { updateUser, loginSuccess, logout } = userSlice.actions;
export default userSlice.reducer;
