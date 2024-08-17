import React, { useEffect } from "react";
import Alert from "@mui/material/Alert";
import { useDispatch } from "react-redux";
import Snackbar from "@mui/material/Snackbar";
import { closeSnackbar } from "../redux/reducers/snackbarSlice";


/**
 * A reusable ToastMessage component that displays a message with a specific severity.
 *
 * @param {string} message - The message to be displayed in the toast.
 * @param {string} severity - The severity of the message (e.g. 'success', 'error', 'warning', 'info').
 * @param {boolean} open - A boolean indicating whether the toast is open or not.
 * @return {JSX.Element} A JSX element representing the toast message.
 */
const ToastMessage = ({ message, severity, open }) => {
  const dispatch = useDispatch();
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={() => dispatch(closeSnackbar())}
    >
      <Alert
        onClose={() => dispatch(closeSnackbar())}
        severity={severity}
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default ToastMessage;


