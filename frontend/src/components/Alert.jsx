import React, { useEffect } from "react";
import { Snackbar, Alert as MuiAlert } from "@mui/material";
import PropTypes from "prop-types";

const Alert = ({ alert, setAlert }) => {
  useEffect(() => {
    if (alert.open) {
      const timer = setTimeout(() => {
        setAlert({ ...alert, open: false });
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [alert, setAlert]);

  return (
    <Snackbar
      open={alert.open}
      autoHideDuration={3000}
      onClose={() => setAlert({ ...alert, open: false })}
    >
      <MuiAlert severity="success" sx={{ width: "100%" }}>
        {alert.message}
      </MuiAlert>
    </Snackbar>
  );
};

Alert.propTypes = {
  alert: PropTypes.object.isRequired,
  setAlert: PropTypes.func.isRequired,
};

export default Alert;
