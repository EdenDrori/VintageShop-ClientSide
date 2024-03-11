import { useLocation } from "react-router-dom";

const IconsGuardFavorite = ({ children }) => {
  const location = useLocation();

  const isFavoritePage = location.pathname === "/favorite";

  if (!isFavoritePage) {
    return children;
  } else {
    return null; 
  }
};

export default IconsGuardFavorite;
