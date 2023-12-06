import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { useEffect, useState } from "react";
import axios from "axios";
import config from "../../config.json";
import Cookies from "js-cookie";

const backendUrl = config.backendUrl;

export default function SelectTextFields({ onGroupChange }) {
  const [group, setGroup] = useState("");
  const [options, setOptions] = useState([]);
  const [userId, setUserId] = useState(""); // [selectedGroup, setSelectedGroup

  useEffect(() => {
    async function fetchUser() {
      var token = Cookies.get("authToken");
      var user = JSON.parse(Cookies.get("userDetails"));
      const response = await axios.post(backendUrl + "/api/auth/isauth", {
        token: token,
        email: user.email,
      });
      console.log("Dashboard response", response.data.userid);

      setUserId(response.data.userid);
    }
    async function fetchGroups() {
      await axios
        .get(backendUrl + `/api/group/user/${userId}`)
        .then((response) => {
          const groupsMap = response.data.data;
          console.log("Groups Map ===>", groupsMap);
          
          const optionsArray = Object.entries(groupsMap).map(
            ([key, value]) => ({
              _id: key,
              name: value,
            })
          );
          
          if (optionsArray.length > 0) {
            console.log("Options Array", optionsArray);
            const selectedAttributes = optionsArray.map(obj => obj.name);
            setOptions(optionsArray);
            console.log("Options", options);
          } else {
            console.error("No data received from the API.");
          }
        })
        .catch((error) => {
          console.error("Error fetching groups:", error);
        });
    }

    fetchUser();
    fetchGroups();
  }, [userId]);

  const handleChange = (event) => {
    setGroup(event.target.value);
    onGroupChange(event.target.value);
    console.log("Selected group SelectFields", event.target.value);
  };

  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        alignItems: "center",
        "& .MuiTextField-root": { m: 1, minWidth: "200px" },
      }}
      noValidate
      autoComplete="off"
    >
      <div style={{ marginRight: "1rem" }}>Your Task Groups:</div>
      <TextField
        id="group-select"
        select
        label="Group"
        value={group}
        onChange={handleChange}
        helperText="Select the group"
      >
        {options.map((option) => (
          <MenuItem key={option._id} value={option.name}>
            {option.name}
          </MenuItem>
        ))}
      </TextField>
    </Box>
  );
}
