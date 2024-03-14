import { useState } from "react";
import { TextField, Button, Typography, Box, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/ROUTES";
import { toast } from "react-toastify";
import axios from "axios";
import { validateMessage } from "../../validation/validateMessage";

const ContactForm = () => {
  const [errorsState, setErrorsState] = useState(null);
  const [inputsValue, setInputsValue] = useState({
    name: "",
    email: "",
    message: "",
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setInputsValue((currentState) => ({
      ...currentState,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const joiResponse = validateMessage(inputsValue);
      
      setErrorsState(joiResponse);
      if (joiResponse) return;
      const request = {
        name: inputsValue.name,
        email: inputsValue.email,
        message: inputsValue.message,
      };
      const { data } = await axios.post("/contact", request);
     

      toast("We got your message, thank you :)", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      navigate(ROUTES.HOME);
    } catch (err) {
      toast("Somthing is missing... try again", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "80vh",
      }}
    >
      <Box sx={{ maxWidth: 600, mx: "auto", p: 2 }}>
        <Typography variant="h4" align="center" mb={2}>
          Contact Us
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Name"
            id="name"
            value={inputsValue.name}
            onChange={handleInputChange}
            margin="normal"
            required
          />
          {errorsState && errorsState.name && (
            <Alert severity="warning">{errorsState.name}</Alert>
          )}
          <TextField
            fullWidth
            label="Email"
            id="email"
            value={inputsValue.email}
            onChange={handleInputChange}
            margin="normal"
            required
            type="email"
          />
          {errorsState && errorsState.email && (
            <Alert severity="warning">{errorsState.email}</Alert>
          )}
          <TextField
            fullWidth
            label="Message"
            id="message"
            value={inputsValue.message}
            onChange={handleInputChange}
            margin="normal"
            required
            multiline
            rows={4}
          />
          {errorsState && errorsState.message && (
            <Alert severity="warning">{errorsState.message}</Alert>
          )}
          <Button
            variant="outlined"
            type="submit"
            sx={{ mt: 2, width: "100%" }}
          >
            Submit
          </Button>
        </form>
      </Box>
    </Box>
  );
};
export default ContactForm;
