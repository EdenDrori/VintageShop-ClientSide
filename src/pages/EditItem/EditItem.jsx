import { useEffect, useRef, useState } from "react";
import {
  Container,
  TextField,
  Grid,
  Typography,
  Divider,
  Button,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import ROUTES from "../../routes/ROUTES";
import axios from "axios";
import { inputsValueObj } from "../addItemPage/inputsValueObj";
import { newDataForInputs } from "./newDataForInputs";
import { updateChangesClick } from "./updateChangeClick";
import ImageUpload from "../../components/imageInput";

const EditItem = () => {
  const [errorsState, setErrorsState] = useState(null);
  const navigate = useNavigate();
  const [inputsValue, setInputValue] = useState(inputsValueObj());
  const [category, setCategory] = useState("");
  const urlRef = useRef();

  const { _id } = useParams();
  useEffect(() => {
    axios
      .get("/items/" + _id)
      .then(({ data }) => {
        setInputValue(newDataForInputs(data));
        setCategory(data.category);
      })
      .catch((err) => {});
  }, []);

  const handleChangeCategory = (event) => {
    setCategory(event.target.value);
  };
  const handleInputChange = (e) => {
    setInputValue((currentState) => ({
      ...currentState,
      [e.target.id]: e.target.value,
    }));
  };
  const handleNavigate = () => {
    navigate(ROUTES.MYITEM);
  };
  const handleUpdateChangesClick = () => {
    const childState = urlRef.current.getChildState();
    updateChangesClick(
      inputsValue,
      category,
      setErrorsState,
      navigate,
      _id,
      childState
    );
  };
  return (
    <Container
      sx={{
        padding: { xs: "0px", md: "50px" },
        paddingBottom: "60px",
        mt: 3,
        mb: 7,
        width: { xs: "90vw", md: "50vw" },
      }}
    >
      <Typography
        variant="h2"
        sx={{
          mb: 1,
          padding: "10px",
          pb: "0px",
          textAlign: "center",
          fontSize: { xs: "2.5rem", md: "4rem" },
        }}
      >
        Edit Your Item
      </Typography>
      <Typography
        variant="body1"
        sx={{
          mb: 1,
          padding: "3px",
          ml: "7px",
          textAlign: "center",
          fontSize: { xs: "1rem", md: "auto" },
        }}
      >
        Put a new values in the correct input
      </Typography>

      <Divider sx={{ mb: 3 }} />
      <Grid container flexDirection={"column"}>
        <ImageUpload url={inputsValue.url} ref={urlRef} />
        <FormControl fullWidth sx={{ mt: "10px" }}>
          <InputLabel id="demo-simple-select-label">Category</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="category"
            value={category}
            label="Category"
            onChange={handleChangeCategory}
          >
            <MenuItem value={"clothing"}>Clothing</MenuItem>
            <MenuItem value={"accessories"}>Accessories</MenuItem>
            <MenuItem value={"shoes"}>Shoes</MenuItem>
            <MenuItem value={"bags"}>Bags</MenuItem>
            <MenuItem value={"others"}>Others</MenuItem>
          </Select>
        </FormControl>
        <TextField
          id="title"
          label="Title"
          variant="outlined"
          sx={{ mt: "10px" }}
          onChange={handleInputChange}
          value={inputsValue.title}
          required
        />
        {errorsState && errorsState.title && (
          <Alert severity="warning">{errorsState.title}</Alert>
        )}
        <TextField
          id="brand"
          label="brand"
          variant="outlined"
          sx={{ mt: "10px" }}
          onChange={handleInputChange}
          value={inputsValue.brand}
          required
        />
        {errorsState && errorsState.brand && (
          <Alert severity="warning">{errorsState.brand}</Alert>
        )}
        <TextField
          id="phone"
          label="Phone Number"
          variant="outlined"
          sx={{ mt: "10px" }}
          onChange={handleInputChange}
          value={inputsValue.phone}
          required
        />
        {errorsState && errorsState.phone && (
          <Alert severity="warning">{errorsState.phone}</Alert>
        )}
        <TextField
          id="description"
          label="Description"
          variant="outlined"
          sx={{ mt: "10px" }}
          onChange={handleInputChange}
          value={inputsValue.description}
          required
        />
        {errorsState && errorsState.description && (
          <Alert severity="warning">{errorsState.description}</Alert>
        )}
        <TextField
          id="price"
          label="Price ($)"
          variant="outlined"
          sx={{ mt: "10px" }}
          onChange={handleInputChange}
          value={inputsValue.price}
          required
        />
        {errorsState && errorsState.price && (
          <Alert severity="warning">{errorsState.price}</Alert>
        )}

        <TextField
          id="size"
          label="size"
          variant="outlined"
          sx={{ mt: "10px" }}
          onChange={handleInputChange}
          value={inputsValue.size}
        />
        {errorsState && errorsState.size && (
          <Alert severity="warning">{errorsState.size}</Alert>
        )}

        <TextField
          id="country"
          label="Country"
          variant="outlined"
          sx={{ mt: "10px" }}
          onChange={handleInputChange}
          value={inputsValue.country}
          required
        />
        {errorsState && errorsState.country && (
          <Alert severity="warning">{errorsState.country}</Alert>
        )}
        <TextField
          id="city"
          label="City"
          variant="outlined"
          sx={{ mt: "10px" }}
          onChange={handleInputChange}
          value={inputsValue.city}
          required
        />
        {errorsState && errorsState.city && (
          <Alert severity="warning">{errorsState.city}</Alert>
        )}
        <TextField
          id="street"
          label="Street"
          variant="outlined"
          sx={{ mt: "10px" }}
          onChange={handleInputChange}
          value={inputsValue.street}
          required
        />
        {errorsState && errorsState.street && (
          <Alert severity="warning">{errorsState.street}</Alert>
        )}
        <TextField
          id="houseNumber"
          label="House Number"
          variant="outlined"
          sx={{ mt: "10px" }}
          onChange={handleInputChange}
          value={inputsValue.houseNumber}
          required
        />
        {errorsState && errorsState.houseNumber && (
          <Alert severity="warning">{errorsState.houseNumber}</Alert>
        )}
      </Grid>
      <Grid container spacing={2}>
        <Grid item lg={8} md={8} sm={8} xs>
          <Button
            variant="outlined"
            sx={{ mt: 2, width: "100%", ml: "0%" }}
            onClick={handleUpdateChangesClick}
          >
            Update Changes
          </Button>
        </Grid>
        <Grid item xs>
          <Link to={ROUTES.MYITEM}>
            <Button
              variant="outlined"
              sx={{
                mt: 2,
                width: "100%",
                ml: "0%",
              }}
              onClick={handleNavigate}
            >
              Discard Changes
            </Button>
          </Link>
        </Grid>
      </Grid>
    </Container>
  );
};
export default EditItem;
