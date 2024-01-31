import { useState, useRef } from "react";
import {
  Container,
  TextField,
  Grid,
  Typography,
  Divider,
  Button,
  Select,
  InputLabel,
  FormControl,
  MenuItem,
  Alert,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import ROUTES from "../../routes/ROUTES";
import { addItemClick } from "./addItemClick";
import { inputsValueObj } from "./inputsValueObj";
import ImageUpload from "../../components/imageInput";
import axios from "axios";

const AddItem = () => {
  const [errorsState, setErrorsState] = useState(null);
  const urlRef = useRef();
  const navigate = useNavigate();
  const [inputsValue, setInputValue] = useState(inputsValueObj());
  const [category, setCategory] = useState("");

  // const validateAddress = async () => {
  //   console.log("api");
  //   const addressToValidate = `${inputsValue.houseNumber} ${inputsValue.street}, ${inputsValue.city}, ${inputsValue.country}`;
  //   const apiKey = "AIzaSyB14AY-b2zU0WJ43-7TeqYsmsdD7VbmVu0";
  //   const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
  //     addressToValidate
  //   )}&key=${apiKey}`;

  //   try {
  //     const response = await axios.get(apiUrl);

  //     if (response.data.status === "OK") {
  //       const location = response.data.results[0].geometry.location;
  //       const formattedAddress = response.data.results[0].formatted_address;

  //       console.log("Validated Address:", formattedAddress);
  //     } else {
  //       console.error("Geocoding API request failed:", response.data.status);
  //     }
  //   } catch (error) {
  //     console.error("Error making Geocoding API request:", error);
  //     return;
  //   }
  // };

  const handleInputChange = (e) => {
    setInputValue((currentState) => ({
      ...currentState,
      [e.target.id]: e.target.value,
    }));
  };

  const handleChangeCategory = (event) => {
    setCategory(event.target.value);
  };

  const handleAddItemClick = () => {
    const childState = urlRef.current.getChildState();

    // Add address validation before submitting the item
    // validateAddress();

    addItemClick(inputsValue, setErrorsState, navigate, childState, category);
  };

  return (
    <Container
      sx={{
        padding: "50px",
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
          textAlign: "center",
          fontSize: { xs: "2.5rem", md: "4rem" },
        }}
      >
        Create New Item
      </Typography>
      <Typography variant="h5" sx={{ textAlign: "center", marginBottom: "3%" }}>
        Craft your professional identity in seconds. Create and customize your
        business card with ease, making a lasting impression effortlessly.
      </Typography>

      <Divider sx={{ mb: 3 }} />
      <Grid container flexDirection={"column"}>
        <ImageUpload ref={urlRef} />
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
          {errorsState && category === "" && (
            <Alert severity="warning">"please choose category"</Alert>
          )}
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
        <Grid item lg={8} md={8} sm={8} xs={12}>
          <Button
            variant="outlined"
            sx={{ mt: 2, width: "100%", ml: "0%" }}
            onClick={handleAddItemClick}
          >
            Publish Item
          </Button>
        </Grid>
        <Grid item xs>
          <Link to={ROUTES.HOME}>
            <Button
              variant="outlined"
              sx={{
                mt: { xs: 0, sm: 2 },
                width: "100%",
                ml: "0%",
              }}
            >
              Discrad
            </Button>
          </Link>
        </Grid>
      </Grid>
    </Container>
  );
};
export default AddItem;
