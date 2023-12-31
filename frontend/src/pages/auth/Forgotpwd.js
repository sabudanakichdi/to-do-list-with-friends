import { Stack, Button, Grid,TextField, Box } from '@mui/material';
import React from 'react';
import logo from '../../assets/logo.png'
import ForgotpwdComp from '../../components/Auth/ForgotpwdComp';

function Forgotpwd() {

  return (
        <Box sx={{
            direction:"row",
            bgcolor: 'secondary.main',
          borderRadius: 5,
          boxShadow: 1,                              
          width: '80%',          
          alignself: "center", 
          alignItems:"center",   
          justify:"flex-end",
          justifyContent:"center",    
          p:2,            
            marginTop:'10%',
            marginBottom:'10%',  
            marginLeft:'10%',
                      
        }}>          
            <Grid
            container  my={8} 
            direction="column"
            alignItems="center"
            justifyContent="center"  
            spacing={2} minWidth='50%'
            >       
                <Grid item xs={24} sm={12} justifyContent="center" >
                    <img src={logo} margin="none" alignself="center" />
                </Grid>   
                <Grid item xs={24} sm={12} >        
                    <ForgotpwdComp/>
                </Grid>  
            </Grid>                
        </Box>      
  );
}

export default Forgotpwd;