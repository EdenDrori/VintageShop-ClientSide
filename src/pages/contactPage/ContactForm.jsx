import { useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/ROUTES";
import { toast } from "react-toastify";
import axios from "axios";


const ContactForm = () => {
  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  // const [message, setMessage] = useState("");
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
    

      const request = {
        name: inputsValue.name,
        email: inputsValue.email,
        message: inputsValue.message,
      };
      const { data } = await axios.post("/contact", request);
      console.log(data);

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
      //console.log(err, "err");
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
