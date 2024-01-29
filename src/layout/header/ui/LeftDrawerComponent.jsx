import { Box, Drawer, Button ,Typography, Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,} from "@mui/material";
  import React, { Fragment, useState } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import { useSelector } from "react-redux";
import { getToken } from "../../../service/storageService";
import { jwtDecode } from "jwt-decode";
import NavLinkComponent from "../NavLinkComponent";
import myLinks, {
  alwaysLinks,
  loggedInLinks,
  loggedOutLinks,
  loggedInBizLinks,
  loggedInAdminLinks,
} from "../../myLinks";
import nextKey from "generate-my-key";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../../routes/ROUTES";

const LeftDrawerComponent = ({ isOpen, onCloseDrawer }) => {
  const loggedIn = useSelector((bigPie) => bigPie.authSlice.loggedIn);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const navigate = useNavigate();
  let token = getToken();
  let loggedInBiz = token ? jwtDecode(token).isBusiness : false;
  let loggedInAdmin = token ? jwtDecode(token).isAdmin : false;
  
  const handleLogout = () => {
     if (loggedIn) {
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
  const list = () => (
    <Box
      sx={{ width: { auto: 250 }, display: "flex", flexDirection: "column" }}
      role="presentation"
      onClick={onCloseDrawer}
      onKeyDown={onCloseDrawer}
    >
      {alwaysLinks.map((myItem) => (
        <NavLinkComponent to={myItem.to} key={nextKey()}>
          {myItem.children}
        </NavLinkComponent>
      ))}
      {loggedIn &&
        !loggedInBiz &&
        loggedInLinks.map((myItem) => (
          <NavLinkComponent to={myItem.to} key={nextKey()}>
            {myItem.children}
          </NavLinkComponent>
        ))}
      {loggedIn &&
        loggedInBiz &&
        loggedInBizLinks.map((myItem) => (
          <NavLinkComponent to={myItem.to} key={nextKey()}>
            {myItem.children}
          </NavLinkComponent>
        ))}
      {loggedIn &&
        loggedInBiz &&
        loggedInAdmin &&
        loggedInAdminLinks.map((myItem) => (
          <NavLinkComponent to={myItem.to} key={nextKey()}>
            {myItem.children}
          </NavLinkComponent>
        ))}
      {!loggedIn &&
        !loggedInBiz &&
        loggedOutLinks.map((myItem) => (
          <NavLinkComponent to={myItem.to} key={nextKey()}>
            {myItem.children}
          </NavLinkComponent>
        ))}
      {loggedIn && <LogoutIcon sx={{ ml: 2, mt: 2 }} onClick={handleLogout} />}
     
    </Box>
  );
  return (
    <Fragment>
      <Drawer anchor="left" open={isOpen} onClose={onCloseDrawer}>
        {list()}
      </Drawer>
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
    </Fragment>
  );
};

export default LeftDrawerComponent;
