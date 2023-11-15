
import axios from 'axios';
import config from '../config.json';


export const AuthVerify = async () => {
    try{
        const backendUrl = config.backendUrl;
        var token=localStorage.getItem("authToken");
        var user=JSON.parse(localStorage.getItem("userDetails"));
        const response = await axios.post(backendUrl+'/auth/isauth', {"token": token, "email": user.email});   

        if (response.status===200)
            return true;    
        return false;
    } catch (error) {    
        console.error('Error verifying authentication:', error);
        return false;
    }
  };