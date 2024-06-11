import React from "react";
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";
import PropTypes from "prop-types";

const ReadingList = ({ readingList, removeBookFromReadingList, showAlert }) => {
  if (readingList.length === 0) {
    return (
      <Typography variant="h6" align="center">
        There are no books in your reading list.
      </Typography>
    );
  }

  return (
    <Grid container spacing={2} justifyContent="center">
      {readingList.map((book, index) => (
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
              <Button
                variant="contained"
                color="secondary"
                onClick={() => {
                  removeBookFromReadingList(book);
                  showAlert(`Removed ${book.title} from the reading list`);
                }}
                fullWidth
              >
                Remove
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

ReadingList.propTypes = {
  readingList: PropTypes.array,
  removeBookFromReadingList: PropTypes.func.isRequired,
  showAlert: PropTypes.func.isRequired,
};

ReadingList.defaultProps = {
  readingList: [],
};

export default ReadingList;
