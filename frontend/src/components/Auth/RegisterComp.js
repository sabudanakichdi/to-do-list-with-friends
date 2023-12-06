import React from 'react';
import { TextField,Button, Grid } from '@mui/material';
import config from '../../config.json';
import axios from 'axios';

const backendUrl = config.backendUrl;

function RegisterComp() {
  const [username, setUsername] = React.useState('');
  const [contact, setContact] = React.useState('');
  const [fname, setFName] = React.useState('');
  const [lname, setLName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [npassword, setNpassword] = React.useState('');
  const [cpassword, setCpassword] = React.useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the form fields
    if (username === '') {
      alert('Please enter a username.');
      return;
    }

    if (contact === '') {
      alert('Please enter a contact number.');
      return;
    }

    if (npassword === '') {
      alert('Please enter a new password.');
      return;
    }

    if (cpassword === '') {
      alert('Please confirm your new password.');
      return;
    }

    if (npassword !== cpassword) {
      alert('Your new password and confirm password do not match.');
      return;
    }
    const response = await axios.post(backendUrl+'/api/auth/register', 
        { email: email , username:username,contact:contact,first_name:fname,last_name:lname, password: npassword },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        });
    // Submit the form

    if (response.status === 200) {
      alert("User registered successfully");
      window.location.href = '/login';
      // User registered successfully
      // setSuccessMessage('You have been registered successfully!');
    } else {
      // Registration failed
      // console.log(response);
      alert(response.body);
    }
  };
     

  return (
<Grid
  container  my={8} 
  direction="column"
  alignItems="center"
  justifyContent="center"  
  spacing={2} minWidth='50%'
  >       
    <Grid item xs={1} sm={1}>
    <TextField
      type="text"
      label="Username"
      variant="outlined"
      color="primary"
      focused
      fullWidth
      size="medium"
      minLength="100%"
      xs={{ width: '100%' }}
      placeholder="Username"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
    />
  </Grid>
  <Grid item xs={1} sm={1}>
    <TextField
      type="tel"
      label="Contact"
      size="medium"
      fullWidth
      variant="outlined"
      color="primary"
      minLength="100%"
      focused
      xs={{ width: '100%' }}
      placeholder="Contact"
      value={contact}
      onChange={(e) => setContact(e.target.value)}
    />
  </Grid>
  <Grid item xs={1} sm={1}>
    <TextField
      type="password"
      label="Password"
      size="medium"
      fullWidth
      minLength="100%"
      variant="outlined"
      color="primary"
      focused
      xs={{ width: '100%' }}
      placeholder="Password"
      value={npassword}
      onChange={(e) => setNpassword(e.target.value)}
    />
  </Grid>
  <Grid item xs={12} sm={12}>
    <TextField
      type="password"
      label="Confirm Password"
      size="medium"
      minLength="100%"
      fullWidth
      variant="outlined"
      color="primary"
      focused
      xs={{ width: '100%' }}
      placeholder="Confirm Password"
      value={cpassword}
      onChange={(e) => setCpassword(e.target.value)}
    />
  </Grid>
  <Grid item xs={12} sm={12}>
    <TextField
      type="text"
      label="First Name"
      size="medium"
      fullWidth
      variant="outlined"
      color="primary"
      minLength="100%"
      focused
      xs={{ width: '100%' }}
      placeholder="First Name"
      value={fname}
      onChange={(e) => setFName(e.target.value)}
    />
  </Grid>
  <Grid item xs={12} sm={12}>
    <TextField
      type="text"
      label="Last Name"
      size="medium"
      fullWidth
      minLength="100%"
      variant="outlined"
      color="primary"
      focused
      xs={{ width: '100%' }}
      placeholder="Last Name"
      value={lname}
      onChange={(e) => setLName(e.target.value)}
    />
  </Grid>
  <Grid item xs={12} sm={12}>
    <TextField
      type="email"
      label="Email"
      size="medium"
      fullWidth
      minLength="100%"
      variant="outlined"
      color="primary"
      focused
      xs={{ width: '100%' }}
      placeholder="Email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />
  </Grid>
  <Grid item xs={12} sm={12}>
    <Button
      
      variant="contained"
      type="submit"
      onClick={handleSubmit}
    >
      Register
    </Button>
  </Grid>
  </Grid> 
  );
}

export default RegisterComp;