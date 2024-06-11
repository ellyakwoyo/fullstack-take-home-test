import React, { Component } from "react";
import { Typography } from "@mui/material";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Typography variant="h5" color="error">
          Something went wrong.
        </Typography>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
