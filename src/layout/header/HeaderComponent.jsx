import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MoreIcon from "@mui/icons-material/MoreVert";
import {
  Switch,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import LeftDrawerComponent from "./ui/LeftDrawerComponent";
import FilterComponent from "./ui/FilterComponent";
import ROUTES from "../../routes/ROUTES";
import logo from "../../images/logo.png";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const HeaderComponent = ({ isDarkTheme, onThemeChange }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

  const navigate = useNavigate();
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const isLoggedinOrOut = useSelector((bigPie) => bigPie.authSlice.loggedIn);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleThemeChange = (event) => {
    onThemeChange(event.target.checked);
  };

  const handleOpenDrawerClick = () => {
    setIsOpen(true);
  };

  const handleCloseDrawerClick = () => {
    setIsOpen(false);
  };

  const handleProfileLink = () => {
    if (isLoggedinOrOut) {
      navigate(ROUTES.PROFILE);
    } else {
      navigate(ROUTES.REGISTER);
    }
  };

  const handleNavigate = () => {
    navigate(ROUTES.PROFILE);
  };

  const handleLogoutLink = () => {
    if (isLoggedinOrOut) {
      setLogoutDialogOpen(true);
    } else {
      navigate(ROUTES.LOGIN);
    }
  };

  const handleLogoutConfirm = () => {
    // Perform logout logic here
    setLogoutDialogOpen(false);
    navigate(ROUTES.LOGOUT);
  };

  const handleLogoutCancel = () => {
    setLogoutDialogOpen(false);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleProfileLink}>
        {isLoggedinOrOut ? "Profile" : "Register"}
      </MenuItem>
      <MenuItem onClick={handleLogoutLink}>
        {isLoggedinOrOut ? "Logout" : "Login"}
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
          onClick={handleNavigate}
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1, mb: 2 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: { xs: "0", sm: 2 } }}
            onClick={handleOpenDrawerClick}
          >
            <MenuIcon />
          </IconButton>

          <img sx={{ marginTop: "20px" }} src={logo} alt="" />

          <Box
            sx={{
              position: "absolute",
              right: { xs: 15, md: 80 },
              my: 2,
              p: 1,
            }}
          >
            <Typography sx={{ display: { xs: "none", md: "inline" } }}>
              {isDarkTheme ? "Dark" : "Light"} Mode
            </Typography>
            <Switch checked={isDarkTheme} onChange={handleThemeChange} />
          </Box>
          <Box sx={{ display: { xs: "none", sm: "flex" } }}>
            <FilterComponent />
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box
            sx={{ display: { xs: "none", sm: "flex", md: "none", lg: "none" } }}
          >
            <IconButton
              sx={{ padding: "0" }}
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      <LeftDrawerComponent
        isOpen={isOpen}
        onCloseDrawer={handleCloseDrawerClick}
      />

      {/* Logout Confirmation Dialog */}
      <Dialog open={logoutDialogOpen} onClose={handleLogoutCancel}>
        <DialogTitle>Logout Confirmation</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to logout?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLogoutCancel}>Cancel</Button>
          <Button
            onClick={handleLogoutConfirm}
            variant="contained"
            color="primary"
          >
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
export default HeaderComponent;
