
import axios from 'axios';
import config from '../config.json';
import Cookies from 'js-cookie';

export const AuthVerify = async () => {
    try{
        const backendUrl = config.backendUrl;
        var token=Cookies.get("authToken");
        var user=JSON.parse(Cookies.get("userDetails"));
        const response = await axios.post(backendUrl+'/api/auth/isauth', {"token": token, "email": user.email});   

        if (response.status===200)
            return true;    
        return false;
    } catch (error) {    
        console.error('Error verifying authentication:', error);
        return false;
    }
  };

export const getLoggedinUser =() => {
    try{
        var user=JSON.parse(Cookies.get("userDetails"));
        return user;        
    } catch (error) {                    
    }
    
}