import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import BookListPage from "./components/BookListPage";
import ReadingListPage from "./components/ReadingListPage";
import theme from "./theme";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4000/",
  cache: new InMemoryCache(),
});

const App = () => {
  const [books, setBooks] = useState();
  useEffect(() => {
    client
      .query({
        query: gql`
          query Books {
            books {
              author
              coverPhotoURL
              readingLevel
              title
            }
          }
        `,
      })
      .then((result) => {
        console.log(result);
        setBooks(result.data.books);
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
      });
  }, []);

  const [readingList, setReadingList] = useState([]);
  const [alert, setAlert] = useState({ open: false, message: "" });

  const addBookToReadingList = (book) => {
    if (!readingList.some((b) => b.title === book.title)) {
      setReadingList([...readingList, book]);
      showAlert(`Added ${book.title} to the reading list`);
    } else {
      showAlert(`${book.title} is already in the reading list`);
    }
  };

  const removeBookFromReadingList = (book) => {
    setReadingList(readingList.filter((b) => b !== book));
    showAlert(`Removed ${book.title} from the reading list`);
  };

  const showAlert = (message) => {
    setAlert({ open: true, message });
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          {books && (
            <Route
              path="/"
              element={
                <BookListPage
                  books={books}
                  addBookToReadingList={addBookToReadingList}
                  showAlert={showAlert}
                />
              }
            />
          )}
          <Route
            path="/reading-list"
            element={
              <ReadingListPage
                readingList={readingList}
                removeBookFromReadingList={removeBookFromReadingList}
                showAlert={showAlert}
              />
            }
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
