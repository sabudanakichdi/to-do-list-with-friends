import { Stack, Button, Grid,TextField, Box } from '@mui/material';
import React from 'react';
import logo from '../../assets/logo.png'
import LoginComp from '../../components/Auth/LoginComp'
import { AuthVerify } from "../../context/AuthContext"
import Cookies from 'js-cookie';

function Login() {  
  const checklogin = async () => {
    const token = Cookies.get('authToken');
    const userDetails = JSON.parse(Cookies.get('userDetails'));

    if (token!==null && userDetails!==null && await AuthVerify()) {
      // window.location.href = '/register';
      window.location.href = '/dashboard';
    }   
    // console.log(this.state.user);
  };
  checklogin();

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
            <Grid item xs={12} sm={12} justifyContent="center" >
                <img src={logo} margin="none" alignself="center" />
            </Grid>     
            <Grid item xs={12} sm={12} >        
                <LoginComp/>
            </Grid>
        </Grid>                
    </Box>      
  );
}

export default Login;