import * as React from "react";
import { Fragment } from "react";
import { useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AddressForm from "./AddressForm";
import Payment from "./Payment";
import Review from "./Review";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { validateAddress } from "../../validation/validateAddress";
import { checkoutNormalize } from "./checkoutNormalize";
import { getToken } from "../../service/storageService";
import { jwtDecode } from "jwt-decode";
import ROUTES from "../../routes/ROUTES";
import { validatePayment } from "../../validation/validatePayment";
import { toast } from "react-toastify";

const steps = ["Address", "Payment details", "Review your order"];

const Checkout = () => {
  const navigate = useNavigate();
  const [errorsState, setErrorsState] = React.useState(null);
  const [errorStatePay, setErrorStatePay] = React.useState(null);
  const [activeStep, setActiveStep] = React.useState(0);
  const addersFormRef = React.useRef();
  const paymentFormRef = React.useRef();
  const [inputsValue, setInputsValue] = React.useState({
    cardName: "",
    cardNumber: "",
    expDate: "",
    cvv: "",
  });
  const [inputsValue1, setInputsValue1] = React.useState({
    first: "",
    last: "",
    country: "",
    city: "",
    street: "",
  });
  const [dataFromServer, setDataFromServer] = React.useState({
    title: "",
    description: "",
    price: "",
    phone: "",
    userId: "",
  });
  const [sellerName, setSellerName] = React.useState({ first: "", last: "" });
  const { _id } = useParams();
  useEffect(() => {
    let token = getToken();
    let idFromToken = jwtDecode(token)._id;
    axios
      .get(`/users/${idFromToken}`)
      .then(({ data }) => {
        const newData = checkoutNormalize(data.user);
        setInputsValue1(newData);
      })
      .catch((err) => {
        toast("Error from server", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  }, []);
  useEffect(() => {
    axios
      .get("/items/" + _id)
      .then(({ data }) => {
        setDataFromServer({
          title: data.title,
          description: data.description,
          price: data.price,
          phone: data.phone,
          userId: data.userId,
        });
      })
      .catch((err) => {
        toast("Error from server", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  }, []);
  useEffect(() => {
    const userId = dataFromServer.userId;
    if (!userId) return;
    axios
      .get("/users/" + userId)
      .then(({ data }) => {
        setSellerName({
          first: data.user.name.first,
          last: data.user.name.last,
        });
        console.log(data.name.first, "user");
      })
      .catch((err) => {
        console.log(err);
      });
  }, [dataFromServer]);

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <AddressForm
            inputsValue1={inputsValue1}
            errorsState={errorsState}
            ref={addersFormRef}
          />
        );

      case 1:
        return (
          <Payment
            inputsValue={inputsValue}
            errorStatePay={errorStatePay}
            ref={paymentFormRef}
          />
        );
      case 2:
        return (
          <Review
            inputsValue={inputsValue}
            inputsValue1={inputsValue1}
            dataFromServer={dataFromServer}
          />
        );
      default:
        throw new Error("Unknown step");
    }
  };

  const handleSoldItem = async () => {
    try {
      setActiveStep(activeStep + 1);
      const { data } = await axios.put("/items/" + _id, {
        status: "sold",
      });
    } catch (err) {}
  };
  const handleNext = () => {
    if (activeStep === 0) {
      const childState = addersFormRef.current.getChildState();
      setInputsValue1(childState);
      const joiResponse = validateAddress(childState);
      setErrorsState(joiResponse);
      if (joiResponse) return;
    }
    if (activeStep === 1) {
      const childStatePay = paymentFormRef.current.getChildState();
      setInputsValue(childStatePay);
      const joiResponsePay = validatePayment(childStatePay);
      setErrorStatePay(joiResponsePay);
      if (joiResponsePay) return;
    }

    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };
  const handleButtonSold = () => {
    activeStep === steps.length - 1 ? handleSoldItem() : handleNext();
  };
  const orderNumber = Math.round(Math.random() * 1_000_000);
  const handleBackAllItems = () => {
    navigate(ROUTES.ITEMS);
  };
  return (
    <Fragment>
      <CssBaseline />
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: "relative",

          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
      
      </AppBar>
      <Container
        component="main"
        maxWidth="sm"
        sx={{
          marginBottom: "60px",
          width: { xs: "90vw", md: "auto" },
          paddingLeft: { xs: "0 !important", sm: "auto" },
          paddingRight: { xs: "0 !important", sm: "auto" },
          marginTop: { xs: "8vh", sm: "auto" },
        }}
      >
        <Paper
          variant="outlined"
          sx={{ my: { xs: 1, md: 6 }, p: { xs: 1, md: 3 } }}
        >
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel sx={{ display: { xs: "none", sm: "flex" } }}>
                  {label}
                </StepLabel>
                <StepLabel
                  sx={{ display: { xs: "flex", sm: "none" } }}
                ></StepLabel>
              </Step>
            ))}
          </Stepper>

          {activeStep === steps.length ? (
            <Fragment>
              <Typography variant="h5" gutterBottom>
                Thank you for your order.
              </Typography>
              <Typography variant="subtitle1">
                Your order number is #{orderNumber}.<br /> You can contact the
                seller for more info.
                <br /> seller name: {sellerName.first} {sellerName.last}
                <br />
                number: {dataFromServer.phone}
              </Typography>
              <Button onClick={handleBackAllItems}>Back to all items</Button>
            </Fragment>
          ) : (
            <Fragment>
              {getStepContent(activeStep)}
            
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                )}

                <Button
                  variant="contained"
                  onClick={handleButtonSold}
                  sx={{ mt: 3, ml: 1 }}
                >
                  {activeStep === steps.length - 1 ? "Place order" : "Next"}
                </Button>
              </Box>
            </Fragment>
          )}
        </Paper>
      </Container>
    </Fragment>
  );
};
export default Checkout;
