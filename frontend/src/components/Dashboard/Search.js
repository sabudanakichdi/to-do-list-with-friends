import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

export default function Search() {
  // Search handling logic

  return (
    <Box sx={{ '& > :not(style)': { m: 1 }, width: '100%' }}>
      <TextField
        id="input-with-icon-textfield"
        placeholder="Group based search"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        variant="standard"
        sx={{
          width: 250, 
          '& .MuiInput-underline:before': {
            borderBottomColor: 'black',
          },
          '& .MuiInput-underline:after': {
            borderBottomColor: 'black',
          },
          '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
            borderBottomColor: 'black',
          },
          '& .MuiInput-underline:hover': {
            borderBottom: '2px solid black',
          },
        }}
      />
    </Box>
  );
}