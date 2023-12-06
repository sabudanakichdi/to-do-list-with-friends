import { Stack, Button, Grid, TextField } from "@mui/material";
import React from "react";
import config from "../../config.json";
import axios from "axios";
import Cookies from "js-cookie";

const backendUrl = config.backendUrl;

function LoginComp() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(email);

const response = await axios.post(backendUrl+'/api/auth/login', {"email": email,"password": password});
console.log(email);
console.log(response.data.token);
  // If the login is successful, store the user's authentication token in local storage
  if (response.status === 200) {
    const token = await response.data.token;
    Cookies.set('authToken', token.token);
    Cookies.set('userDetails', JSON.stringify(response.data.token.user));
    window.location.href = '/';
  } else {
    // TODO: Display an error message to the user
    alert('Invalid email or password');
  }   
};

const handleRegister = async (e) => {
  e.preventDefault();
  window.location.href = '/register';
};

const handleForgetPassword = async (e) => {
  e.preventDefault();
  window.location.href = '/forgot';

};
  return (
    <Grid
      container
      my={8}
      direction="column"
      alignItems="center"
      justifyContent="center"
      spacing={2}
      minWidth="50%"
    >
      <Grid item xs={12} sm={12}>
        <TextField
          type="email"
          label="Email"
          fullWidth
          variant="outlined"
          color="primary"
          focused
          size="50"
          alignself="center"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          xs={1}
        />
      </Grid>
      <Grid item xs={12} sm={12}>
        <TextField
          type="password"
          label="Password"
          fullWidth
          variant="outlined"
          color="primary"
          focused
          alignself="center"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Grid>
      <Grid item xs={12} sm={12}>
        <Button
          alignself="center"
          fullWidth
          variant="contained"
          type="submit"
          onClick={handleSubmit}
        >
          Sign In
        </Button>
      </Grid>
      <Grid item xs={12} sm={12}>
        <Stack direction="row">
          <Button variant="text" onClick={handleRegister}>
            Register
          </Button>
          <Button variant="text" onClick={handleForgetPassword}>
            Forgot Password?
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
}
export default LoginComp;
