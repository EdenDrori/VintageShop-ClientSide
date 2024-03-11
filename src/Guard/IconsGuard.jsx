
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const IconsGuard = ({ children }) => {
  const userData = useSelector((bigPie) => bigPie.authSlice.userData);
  const location = useLocation();

 
  const isMyItemsPage = location.pathname === "/myitem";

  if (userData && userData.isBusiness && isMyItemsPage || userData.isAdmin) {
    return children;
  } else {
    return null;
  }
};

export default IconsGuard;
