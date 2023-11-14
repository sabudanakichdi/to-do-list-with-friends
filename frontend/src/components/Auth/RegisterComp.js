import React from 'react';
import { TextField,Button, Grid } from '@mui/material';
import config from '../../config.json';

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
    const response = await axios.post(backendUrl+'/auth/register', 
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
    <Grid item xs={24} sm={12} >        
        <TextField type="text" label="Username" fullWidth   variant="outlined" color="primary" focused  size='50' alignself= 'center'  placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} xs={1} />        
        <TextField type="tel" label="Contact" fullWidth   variant="outlined" color="primary" focused  size='50' alignself= 'center'  placeholder="Contact" value={contact} onChange={(e) => setContact(e.target.value)} xs={1} />        
    </Grid>  
    <Grid item xs={24} sm={12}>
        <TextField type="password" label="Password" fullWidth  variant="outlined" color="primary" focused  alignself= 'center' placeholder="Password" value={npassword} onChange={(e) => setNpassword(e.target.value)} /> 
        <TextField type="password" label="Confirm Password" fullWidth  variant="outlined" color="primary" focused  alignself= 'center' placeholder="Confirm Password" value={cpassword} onChange={(e) => setCpassword(e.target.value)} /> 
    </Grid>
    <Grid item xs={24} sm={12}>
        <TextField type="text" label="First Name" fullWidth  variant="outlined" color="primary" focused  alignself= 'center' placeholder="First Name" value={fname} onChange={(e) => setFName(e.target.value)} /> 
        <TextField type="text" label="Last Name" fullWidth  variant="outlined" color="primary" focused  alignself= 'center' placeholder="Last Name" value={lname} onChange={(e) => setLName(e.target.value)} /> 
    </Grid>
    <Grid item xs={24} sm={12}>
        <TextField type="email" label="Email" fullWidth  variant="outlined" color="primary" focused  alignself= 'center' placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} /> 
    </Grid>
    <Grid item xs={24} sm={12}>
        <Button alignself= 'center' fullWidth  variant="contained" type="submit" onClick={handleSubmit}>Register</Button>
    </Grid>
  </Grid> 
  );
}

export default RegisterComp;