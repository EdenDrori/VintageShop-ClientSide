import { useLocation } from "react-router-dom";

const IconsGuardLocation = ({ children }) => {
  const location = useLocation();


  const isMyItemsPage = location.pathname === "/myitem";

  if (isMyItemsPage) {
    return children;
  } else {
    return null; 
  }
};

export default IconsGuardLocation;
