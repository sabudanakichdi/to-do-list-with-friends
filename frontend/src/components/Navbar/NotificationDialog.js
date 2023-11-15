import React, { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const NotificationDialog = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <div>
      {/* Button to trigger the notification */}
      <button onClick={handleOpen}>Show Notification</button>

      {/* Snackbar for displaying the notification */}
      <Snackbar
        open={open}
        autoHideDuration={6000} // Duration for which the Snackbar is visible (in milliseconds)
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success">
          This is a success message!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default NotificationDialog;
