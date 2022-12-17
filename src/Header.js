import React, { useState } from "react";
import "./styles.css";
import { useSnackbar } from "notistack";
import { InputAdornment, TextField } from "@mui/material";
import { Search } from "@mui/icons-material";

 /**  returs Header JSX
   @param {Array} rows
   *array of actual data

    @param {Array} originallist
   *array of current data to search for


*/

function Header({ rows, originallist, ...props }) {
  const handleSearch = (data) => {
    props.handleSearch(data);
  };

  const { enqueueSnackbar } = useSnackbar();

  const [debounceTimeout, setDebounceTimeout] = useState(0);
  /**
   * 
   * @param {string} text 
   * search input that should match valu of anuy coloumns
   * @returns 
   */

  const performSearch = async (text) => {
    try {
      const filteredrows = originallist.filter(({ rowData }) => {
        if (rowData.name.startsWith(text)) return true;
        else if (rowData.email.startsWith(text)) {
          return true;
        } else if (rowData.role.startsWith(text)) {
          return true;
        } else {
          return false;
        }
      });

    
      if (filteredrows.length > 0 && text.length > 0) {
        handleSearch(filteredrows);
      } else if (text.length === 0 && filteredrows.length === 0) {
        handleSearch(rows);
      } else {
        handleSearch(filteredrows);
      }

      return filteredrows;
    } catch (e) {
      enqueueSnackbar(
        "Could not fetch products. Check that the backend is running, reachable and returns valid JSON.",
        { variant: "error" }
      );
    }
  };

  const debounceSearch = (event, debounceTimeout) => {
    const value = event.target.value;

    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }
    const timeout = setTimeout(() => {
      performSearch(value);
    }, 500);
    setDebounceTimeout(timeout);
  };

  return (
    <>
      <h1>Admin UI</h1>
      <TextField
      fullWidth
        className="search-desktop"
        size="small"
        InputProps={{
          className: "search",
          endAdornment: (
            <InputAdornment position="end">
              <Search color="primary" />
            </InputAdornment>
          ),
        }}
        placeholder="Search here"
        name="search"
        onChange={(e) => {
          debounceSearch(e, debounceTimeout);
        }}
      />
    </>
  );
}

export default Header;
