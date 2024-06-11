/**Imports*/
import React, { useState } from "react";
import {
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import SearchBar from "./SearchBar";
import Alert from "./Alert";
import AddIcon from "@mui/icons-material/Add";

/**Booking list page component */
const BookListPage = ({ books, addBookToReadingList, showAlert }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [alert, setAlert] = useState({ open: false, message: "" });
  const navigate = useNavigate();

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleAddBook = (book) => {
    addBookToReadingList(book);
    showAlert(`Added ${book.title} to the reading list`);
    setAlert({
      open: true,
      message: `Added ${book.title} to the reading list`,
    });
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
          Book List
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/reading-list")}
        >
          Go to Reading List
        </Button>
      </Box>
      <Box
        sx={{
          position: "sticky",
          top: "64px",
          zIndex: 1,
          background: "white",
          paddingBottom: "10px",
        }}
      >
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={handleSearch}
          books={books}
          handleAddBook={handleAddBook}
        />
      </Box>
      {books.length < 1 && (
        <Typography variant="h6" align="center">
          There are no books.
        </Typography>
      )}
      <Grid container spacing={2} style={{ marginTop: "20px" }}>
        {books.map((book, index) => (
          <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={require(`../${book.coverPhotoURL}`)}
                alt={book.title}
              />
              <CardContent>
                <Typography variant="h6">{book.title}</Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  {book.author}
                </Typography>
              </CardContent>
              <CardActions>
                <IconButton
                  color="primary"
                  onClick={() => handleAddBook(book)}
                >
                  <AddIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Alert alert={alert} setAlert={setAlert} />
    </Container>
  );
};

BookListPage.propTypes = {
  books: PropTypes.array,
  addBookToReadingList: PropTypes.func,
  showAlert: PropTypes.func.isRequired,
};

BookListPage.defaultProps = {
  books: [],
};

export default BookListPage;
