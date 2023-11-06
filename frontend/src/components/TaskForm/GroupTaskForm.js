import React, { useState, useEffect } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import config from '../../config.json';

const backendUrl = config.backendUrl;

function GroupComboBox() {
  const [options, setOptions] = useState([]); // Store the options
  const [selectedGroup, setSelectedGroup] = useState(null);

  useEffect(() => {
    // Fetch data from the API endpoint
    axios.get(backendUrl+'/api/group') // Replace with your API endpoint
      .then((response) => {
        const data = response.data.data;

      // Transform the object into an array of objects
       const optionsArray = Object.keys(data).map((key) => ({
        _id: key,
        name: data[key],
       }));
       setOptions(optionsArray);
      })
      .catch((error) => {
        console.error('Error fetching groups:', error);
      });
  }, []);

  return (
    <div>
      <Autocomplete
        options={options}
        getOptionLabel={(option) => option.name} // Replace 'name' with the property name you want to display
        value={selectedGroup}
        onChange={(event, newValue) => {
          setSelectedGroup(newValue);
        }}
        renderInput={(params) => <TextField {...params} label="Select a group" />}
      className='group-options'/>
    </div>
  );
}

export default GroupComboBox;
