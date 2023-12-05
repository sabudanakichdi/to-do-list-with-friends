import React, { useState, useEffect } from "react";
import "./TaskForm.css";
import axios from "axios";
import Autocomplete from "@mui/material/Autocomplete";
import config from "../../config.json";
import TextField from "@mui/material/TextField";

const backendUrl = config.backendUrl;

function AssigneeComponent(props) {

const [options, setOptions] = useState([]);
const [selectedUser, setSelectedUser] = useState(null);
    useEffect(() => {
    axios
      .get(backendUrl + `/api/auth/users/${props.groupName}`)
      .then((response) => {
        const users = response.data;
        console.log("Users====>", users);
        console.log("Props",props);
        if (Array.isArray(users)) {
            const optionsArray = users.map((user) => ({
                _id: user._id,
                email: user.email,
                username: user.username,
              }));
          setOptions((prevOptions) => [...prevOptions, ...optionsArray]);
        } else {
          console.error("No data received from the API.");
        }
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="assigne-container">
      <label htmlFor="assignee">Assignee</label>
      <Autocomplete
        options={options}
        getOptionLabel={(option) => option.username}
        value={selectedUser}
        onChange={(event, newValue) => {
          setSelectedUser(newValue);
          props.username(newValue);
        }}
        renderInput={(params) => (
          <TextField {...params} label="Select an user" />
        )}
        className="user-options"
        isOptionEqualToValue={(option, value) => option.name === value.name}
      />
    </div>
  );
}

export default AssigneeComponent;
