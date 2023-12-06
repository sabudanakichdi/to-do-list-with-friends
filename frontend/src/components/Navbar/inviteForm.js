import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import config from '../../config.json';

const backendUrl = config.backendUrl;

export default function InviteForm() {
  const [open, setOpen] = React.useState(false);
  const [email, setEmail] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleInvite = async() => {
    try{
    const response = await axios.post(backendUrl+'/api/auth/invite', {'email': email});
    console.log(response);
    return response;
    }
    catch(e){
      console.log(e);
    }
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen} style={{ color: "inherit", textDecoration: "none" }}>
        Invite Friend
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Invite</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter Email of the person you want to invite
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            value={email} onChange={(e) => setEmail(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleInvite}>Invite</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}