import { IconButton } from "@mui/material";
import React, { useContext } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import { Toolbar as MuiToolbar } from "@mui/material";
import { AuthenticationContext } from "../../App";

function Toolbar(props) {
  const { handleDrawerToggle } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { setIsAuthenticated } = useContext(AuthenticationContext);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <MuiToolbar
      sx={{
        backgroundColor: "red",
        zIndex: 1201,
        justifyContent: "space-between",
      }}
    >
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={handleDrawerToggle}
        sx={{ mr: 2, display: { sm: "none" } }}
      >
        <MenuIcon />
      </IconButton>
      <Typography variant="h6" noWrap component="div">
        FionaBombona
      </Typography>
      <div>
        <Avatar alt="Remy Sharp" onClick={handleMenu} />
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
          <MenuItem onClick={handleClose}>My account</MenuItem>
        </Menu>
      </div>
    </MuiToolbar>
  );
}

export default Toolbar;