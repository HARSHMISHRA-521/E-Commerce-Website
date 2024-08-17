import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  open: false,
  message: "",
  severity: "success",
};

export const snackbarSlice = createSlice({
  name: "snackbar",
  initialState,
  reducers: {
    /**
     * Opens the snackbar with the provided message and severity.
     *
     * @param {object} state - The current state of the snackbar.
     * @param {object} action - The action containing the message and severity to display.
     * @param {string} action.payload.message - The message to display in the snackbar.
     * @param {string} action.payload.severity - The severity of the message (e.g. success, error, warning).
     * @return {void}
     */
    openSnackbar: (state, action) => {
      state.open = true;
      state.message = action.payload.message;
      state.severity = action.payload.severity;
    },
    /**
     * Closes the snackbar.
     *
     * @param {object} state - The current state of the snackbar.
     * @return {void}
     */
    closeSnackbar: (state) => {
      state.open = false;
    },
  },
});

export const { openSnackbar, closeSnackbar } = snackbarSlice.actions;
export default snackbarSlice.reducer;
