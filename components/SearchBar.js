import React, { useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import {TextField, Box} from "@mui/material"
import Link from "next/link";


const classes = {
    search:{

    },
    searchInputs:{
        display: "flex"
    },
    searchIcon:{
        display: "grid",
        placeItems: "center"
    }
}

function SearchBar({ placeholder, data }) {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = data.filter((value) => {
      return value.regNo;
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };

  return (
    <Box sx={{...classes.search}}>
      <Box sx={{...classes.searchInputs}}>
        <TextField
          variant="standard"
          placeholder={placeholder}
          value={wordEntered}
          onChange={handleFilter}
        />
        <Box sx={{...classes.searchIcon}}>
          {filteredData.length === 0 ? (
            <SearchIcon />
          ) : (
            <CloseIcon id="clearBtn" onClick={clearInput} />
          )}
        </Box>
      </Box>
      {filteredData.length != 0 && (
        <Box className="dataResult">
          {filteredData.slice(0, 15).map((value, key) => {
            return (
              <Link key={key} href={`/student/${value.regNo}`}>
                  <p>{value.name} </p>
              </Link>
            );
          })}
        </Box>
      )}
    </Box>
  );
}

export default SearchBar;