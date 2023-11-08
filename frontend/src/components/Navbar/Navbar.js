import React from "react";
import { useState } from "react";
import { AppBar, Toolbar, Typography, IconButton,Badge, Box, Menu,MenuItem } from "@mui/material";
import { Link } from "react-router-dom";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Navbar = () => {

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          WE-DO
        </Typography>
        <Box component = "div"sx={{ display: "flex", gap: "9px" }}>
          <Typography variant="h6" className="nav-item">
            <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
              Home
            </Link>
          </Typography>
          <Typography variant="h6" className="nav-item">
            <Link to="/task" style={{ color: "inherit", textDecoration: "none" }}>
              Tasks
            </Link>
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={1} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>      
          <IconButton color="inherit" onClick={handleClick}>
            <AccountCircleIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem component={Link} to='/profile' onClick={handleClose}>Profile</MenuItem>
            <MenuItem component={Link} to='/task' onClick={handleClose}>My Account</MenuItem>
            <MenuItem component={Link} to='/logout' onClick={handleClose}>Logout</MenuItem>
          </Menu>    
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
