import { useLocation } from "react-router-dom";

const IconsGuardFavorite = ({ children }) => {
  const location = useLocation();

  // Check if the current page is "/favorite"
  const isFavoritePage = location.pathname === "/favorite";

  if (!isFavoritePage) {
    return children;
  } else {
    return null; // Return null to indicate no rendering
  }
};

export default IconsGuardFavorite;
