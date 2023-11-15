import { Stack, Button, Grid,TextField, Box } from '@mui/material';
import React from 'react';
import logo from '../../assets/logo.png'
import config from '../../config.json';

const backendUrl = config.backendUrl;

function ResetpwdComp() {
  const [npassword, setnpassword] = React.useState('');
  const [cpassword, setcpassword] = React.useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (npassword !== cpassword) {
        alert('Your new password and confirm password do not match.');
        return;
      }
      const response = await fetch(backendUrl+'/auth/reset', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ npassword }),
      });

      alert('Your password has been reset successfully!');    
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
        <TextField type="password" label="New Password" fullWidth   variant="outlined" color="primary" focused  size='50' alignself= 'center'  placeholder="New password" value={npassword} onChange={(e) => setnpassword(e.target.value)} xs={1} />        
    </Grid>    
    <Grid item xs={24} sm={12} >        
        <TextField type="password" label="Confirm Password" fullWidth   variant="outlined" color="primary" focused  size='50' alignself= 'center'  placeholder="Confirm Password" value={cpassword} onChange={(e) => setcpassword(e.target.value)} xs={1} />        
    </Grid>  
    <Grid item xs={24} sm={12} >        
        <Button alignself= 'center' fullWidth  variant="contained" type="submit" onClick={handleSubmit}>Submit</Button>
    </Grid>  
        </Grid>                            
  );
}

export default ResetpwdComp;