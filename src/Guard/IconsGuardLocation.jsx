import { useLocation } from "react-router-dom";

const IconsGuardLocation = ({ children }) => {
  const location = useLocation();

  // Check if the current page is "/my-items"
  const isMyItemsPage = location.pathname === "/myitem";

  if (isMyItemsPage) {
    return children;
  } else {
    return null; // Return null to indicate no rendering
  }
};

export default IconsGuardLocation;
