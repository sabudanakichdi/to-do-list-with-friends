import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Menu,
  MenuItem,
  Badge,
  List,
  ListItem,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Link, useLocation } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import "../Navbar/Navbar.css"


const Navbar = () => {
  const location = useLocation();
  const showinRoutes = ["/dashboard", "/task"];
  const isHidden = showinRoutes.includes(location.pathname);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const notifications = [
    { id: 1, text: "Notification 1" },
    { id: 2, text: "Notification 2" },
    // Add more notifications as needed
  ];
  const handleNotificationDialogOpen = () => {
    setIsDrawerOpen(true);
  };

  const handleNotificationDialogClose = () => {
    setIsDrawerOpen(false);
    handleClose();
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  if (!isHidden) {
    return null;
  } else {
    return (
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
              WE-DO
            </Link>
          </Typography>
          <Box component="div" sx={{ display: "flex", gap: "9px" }}>
            <Typography variant="h6" className="nav-item">
              <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
                Home
              </Link>
            </Typography>
            <Typography variant="h6" className="nav-item">
              <Link
                to="/task"
                style={{ color: "inherit", textDecoration: "none" }}
              >
                Task
              </Link>
            </Typography>
            <IconButton color="inherit" onClick={handleNotificationDialogOpen}>
              <Badge badgeContent={1} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <Dialog
              open={isDrawerOpen}
              onClose={handleNotificationDialogClose}
              className="notifications-dialog"
            >
              <DialogTitle>Notifications</DialogTitle>
              <DialogContent>
                <List>
                  {notifications.map((notification) => (
                    <ListItem key={notification.id}>
                      <ListItemText primary={notification.text} />
                    </ListItem>
                  ))}
                </List>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleNotificationDialogClose}>Close</Button>
              </DialogActions>
            </Dialog>

            <IconButton color="inherit" onClick={handleClick}>
              <AccountCircleIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem component={Link} to="/profile" onClick={handleClose}>
                Profile
              </MenuItem>
              <MenuItem component={Link} to="/task" onClick={handleClose}>
                My Account
              </MenuItem>
              <MenuItem component={Link} to="/login" onClick={handleClose}>
                Logout
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    );
  }
};

export default Navbar;
