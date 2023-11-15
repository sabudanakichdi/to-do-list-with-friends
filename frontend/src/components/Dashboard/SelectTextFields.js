import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

const groups = [
  {
    value: 'Group1',
    label: 'Group1',
  },

  {
    value: 'Group2',
    label: 'Group2',
  },
  {
    value: 'Group3',
    label: 'Group3',
  }
  // ... Add other groups here
];

export default function SelectTextFields() {
  const [group, setGroup] = React.useState('Group1'); // default value

  const handleChange = (event) => {
    setGroup(event.target.value);
  };

  return (
    <Box
      component="form"
      sx={{
        display: 'flex', 
        alignItems: 'center', 
        '& .MuiTextField-root': { m: 1, minWidth: '200px' }, // adjust as necessary
      }}
      noValidate
      autoComplete="off"
    >
      <div style={{ marginRight: '1rem' }}>Your Task Groups:</div>
      <TextField
        id="group-select"
        select
        label="Group"
        value={group}
        onChange={handleChange}
        helperText="Select the group"
      >
        {groups.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    </Box>
  );
}
