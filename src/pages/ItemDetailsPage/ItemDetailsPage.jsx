import { useEffect, useState } from "react";
import {
  Container,
  TextField,
  Grid,
  Typography,
  Divider,
  Button,
  Box,
} from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import ROUTES from "../../routes/ROUTES";
import axios from "axios";
import { inputsValueObj } from "../addItemPage/inputsValueObj";
import { newDataForInputs } from "./newDataForInputs";
import { height } from "@mui/system";

//import { updateChangesClick } from "./updateChangeClick";

const ItemDetailsPage = () => {
  //const [errorsState, setErrorsState] = useState(null);
  const navigate = useNavigate();
  const [inputsValue, setInputValue] = useState(inputsValueObj());
  const { _id } = useParams();
  useEffect(() => {
    axios
      .get("/items/" + _id)
      .then(({ data }) => {
        setInputValue(newDataForInputs(data));
      })
      .catch((err) => {});
  }, []);
  const handleBackItems = () => {
    navigate(ROUTES.ITEMS);
  };
  const handleCheckout = () => {
    navigate(`${ROUTES.CHECKOUT}/${_id}`);
  };

  return (
    <Container
      sx={{ padding: { xs: "10px", md: "50px" }, paddingBottom: "60px" }}
    >
      <Grid container>
        <Grid item xs={12} md={4} sx={{ height: "55vh" }}>
          {" "}
          <img
            srcSet={inputsValue.url}
            src={inputsValue.url}
            alt={inputsValue.alt}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={8}
          sx={{ paddingLeft: { xs: "10px", md: "10%" }, position: "relative" }}
        >
          <Typography
            variant="h5"
            sx={{
              position: "absolute",
              top: { xs: 25, md: 35 },
              right: { xs: 0, md: 25 },
              // background: "rgba(255, 255, 255, 0.7)",
              // padding: "5px",
              // borderRadius: "5px",
              // marginRight: "7px",
            }}
          >
            {inputsValue.price} $
          </Typography>
          <Typography
            variant="h2"
            sx={{ mb: 1, padding: "10px", pb: "0px", fontFamily: "serif" }}
          >
            {inputsValue.title}
          </Typography>

          <Typography
            variant="h5"
            sx={{ mb: 1, padding: "3px", ml: "7px", fontWeight: "100" }}
          >
            {inputsValue.brand}
          </Typography>
          {/* <Typography variant="h5" sx={{ mb: 1, padding: "3px", ml: "7px" }}>
            {inputsValue.price} $
          </Typography> */}
          <br />
          <Typography
            variant="h5"
            sx={{ mb: 1, padding: "3px", ml: "7px", fontWeight: "200" }}
          >
            {inputsValue.description}
          </Typography>

          <Typography variant="h5" sx={{ mb: 1, padding: "3px", ml: "7px" }}>
            {inputsValue.size}
          </Typography>
          <Typography
            variant="h5"
            sx={{ mb: 1, padding: "3px", ml: "7px", fontSize: 20 }}
          >
            Pickup address: {inputsValue.city} ,{inputsValue.street}{" "}
            {inputsValue.houseNumber}
          </Typography>
          <Typography
            variant="h5"
            sx={{ mb: 1, padding: "3px", ml: "7px", fontSize: 20 }}
          >
            Seller's phone for more detailes: {inputsValue.phone}
          </Typography>
          <Typography
            variant="h5"
            sx={{
              mb: 1,
              padding: "3px",
              ml: "7px",
              display: inputsValue.status === "available" ? "none" : "block",
            }}
          >
            {inputsValue.status}
          </Typography>
          <Button
            variant={inputsValue.status === "sold" ? "disabled" : "outlined"}
            onClick={handleCheckout}
          >
            Buy Now 🛒
          </Button>
        </Grid>
      </Grid>

      <Button onClick={handleBackItems} sx={{ mt: { xs: 8, md: 1 } }}>
        Back to all items
      </Button>
    </Container>
  );
};
export default ItemDetailsPage;
