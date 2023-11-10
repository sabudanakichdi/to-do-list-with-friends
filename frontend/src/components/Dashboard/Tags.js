import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

export default function Tags() {
  const [tags, setTags] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleDelete = (tagToDelete) => () => {
    setTags((tags) => tags.filter((tag) => tag !== tagToDelete));
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && inputValue && !tags.includes(inputValue.trim())) {
      event.preventDefault();
      setTags([...tags, inputValue.trim()]);
      setInputValue('');
    }
  };

  return (
    <Box sx={{ '& > :not(style)': { m: 1 } }}>
      <TextField
        id="tags-input-field"
        placeholder="Add a tag"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyPress={handleKeyPress}
        variant="standard"
        sx={{
          width: 250, // Set your desired width here
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
      <Stack direction="row" spacing={1} sx={{ marginTop: 1 }}>
        {tags.map((tag, index) => (
          <Chip
            key={index}
            label={tag}
            onDelete={handleDelete(tag)}
            sx={{ height: 'auto', maxWidth: '100%' }} // Style your chips here
          />
        ))}
      </Stack>
    </Box>
  );
}
