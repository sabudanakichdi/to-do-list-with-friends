import React from "react";
import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';

const Navbar = ({ groupInfo: { name: groupName = 'NA' } = {} } = {}) => (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          GROUP: {groupName}
        </Typography>
        <Box component = "div"sx={{ display: "flex", gap: "9px" }}>
          <Typography variant="h6" className="nav-item">
            <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
                <Button variant="outlined" color="success" sx={ { borderRadius: 28 } }>Delete group</Button>
            </Link>
          </Typography>
          <Typography variant="h6" className="nav-item">
            <Link to="/task" style={{ color: "inherit", textDecoration: "none" }}>
                <Button variant="outlined" color="success" sx={ { borderRadius: 28 } }><AddIcon /> Add group</Button>
            </Link>
          </Typography>
          
        </Box>
      </Toolbar>
    </AppBar>
  );

export default Navbar;
