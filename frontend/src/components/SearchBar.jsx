/**Import from react */
import React from "react";

/**Imports from mui */
import {
  TextField,
  Autocomplete,
  Box,
  ListItem,
  ListItemText,
  Button,
  CardMedia,
} from "@mui/material";
import PropTypes from "prop-types";

/**Search component */

const SearchBar = ({ searchQuery, setSearchQuery, books, handleAddBook }) => {
  return (
    <Box display="flex" justifyContent="center" mb={3} position="relative">
      <Autocomplete
        freeSolo
        options={books}
        getOptionLabel={(option) => option.title}
        onInputChange={(event, newInputValue) => {
          setSearchQuery(newInputValue);
        }}
        renderOption={(props, option) => (
          <ListItem {...props} key={option.title}>
            <CardMedia
              component="img"
              sx={{ height: "70px", width: "50px" }}
              image={require(`../${option.coverPhotoURL}`)}
              alt={option.title}
            />

            <ListItemText
              sx={{ marginLeft: "10px" }}
              primary={option.title}
              secondary={option.author}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={(e) => {
                e.stopPropagation();
                handleAddBook(option);
              }}
              sx={{ minHeight: "50px", minWidth: "100px" }}
            >
              Add
            </Button>
          </ListItem>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search for books"
            variant="outlined"
            value={searchQuery}
            sx={{ width: "400px" }}
          />
        )}
        onChange={(event, newValue) => {
          if (newValue) {
            handleAddBook(newValue);
          }
        }}
      />
    </Box>
  );
};

SearchBar.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  setSearchQuery: PropTypes.func.isRequired,
  books: PropTypes.array.isRequired,
  handleAddBook: PropTypes.func.isRequired,
};

export default SearchBar;
