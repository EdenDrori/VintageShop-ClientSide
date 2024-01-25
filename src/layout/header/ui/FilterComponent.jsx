import SearchIcon from "@mui/icons-material/Search";
import Search from "./Search";
import SearchIconWrapper from "./SearchIconWrapper";
import StyledInputBase from "./StyledInputBase";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../../routes/ROUTES";
import useQueryParams from "../../../hooks/useQueryParams";
const FilterComponent = () => {
  const [txt, setTxt] = useState("");
  const navigate = useNavigate();

  const query = useQueryParams();

  const handleInputChange = (e) => {
    const { category } = query;
    setTxt(e.target.value);
    navigate(
      `${ROUTES.ITEMS}?filter=${e.target.value}&category=${category || ""}`
    );
  };

  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search…"
        inputProps={{ "aria-label": "search" }}
        value={txt}
        onChange={handleInputChange}
      />
    </Search>
  );
};

export default FilterComponent;
