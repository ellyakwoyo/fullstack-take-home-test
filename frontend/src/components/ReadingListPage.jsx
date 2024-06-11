import React, { useState } from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import ReadingList from "./ReadingList";
import Alert from "./Alert";
import ErrorBoundary from "./ErrorBoundary";

const ReadingListPage = ({ readingList, removeBookFromReadingList }) => {
  const [alert, setAlert] = useState({ open: false, message: "" });
  const navigate = useNavigate();

  const handleShowAlert = (message) => {
    setAlert({ open: true, message });
  };

  return (
    <Container className="container">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          background: "white",
          padding: "10px 0",
        }}
      >
        <Typography variant="h3" gutterBottom>
          Reading List
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/")}
        >
          Back to Book List
        </Button>
      </Box>
      <ErrorBoundary>
        <ReadingList
          readingList={readingList}
          removeBookFromReadingList={removeBookFromReadingList}
          showAlert={handleShowAlert}
        />
      </ErrorBoundary>
      <Alert alert={alert} setAlert={setAlert} />
    </Container>
  );
};

ReadingListPage.propTypes = {
  readingList: PropTypes.array,
  removeBookFromReadingList: PropTypes.func.isRequired,
  showAlert: PropTypes.func.isRequired,
};

ReadingListPage.defaultProps = {
  readingList: [],
};

export default ReadingListPage;
