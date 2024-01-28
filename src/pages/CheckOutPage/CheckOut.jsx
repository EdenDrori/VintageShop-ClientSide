import * as React from "react";
import { Fragment } from "react";
import { useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import { Alert } from "@mui/material";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import AddressForm from "./AddressForm";
import Payment from "./Payment";
import Review from "./Review";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { validateAddress } from "../../validation/validateAddress";
import { inputsValueObjCheckout } from "./inputsValueObjCheckout";
import { checkoutNormalize } from "./checkoutNormalize";
import { getToken } from "../../service/storageService";
import { jwtDecode } from "jwt-decode";
import ROUTES from "../../routes/ROUTES";
import { validatePayment } from "../../validation/validatePayment";

const steps = ["Address", "Payment details", "Review your order"];

const Checkout = () => {
  const navigate = useNavigate();
  const [errorsState, setErrorsState] = React.useState(null);
  const [errorStatePay, setErrorStatePay] = React.useState(null);
  const [activeStep, setActiveStep] = React.useState(0);
  const addersFormRef = React.useRef();
  const paymentFormRef = React.useRef();
  // const [address, setAddress] = React.useState(inputsValueObjCheckout);
  //const navigate = useNavigate();
  //const [thisAble, setAble] = React.useState(true);
  //const addressRef = React.useRef();
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
    //houseNumber: "",
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
        //console.log(data);
        const newData = checkoutNormalize(data.user);
        // console.log(newData, "new");
        setInputsValue1(newData);
      })
      .catch((err) => {
        //console.log(err);
        // toast.info("Error from server, can't get your profile", {
        //   position: toast.POSITION.TOP_CENTER,
        // });
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
        //console.log(dataFromServer);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    const userId = dataFromServer.userId;
    if (!userId) return;
    axios
      .get("/users/" + userId)
      .then(({ data }) => {
        //console.log(data.user.name.first, "user");
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
  // const handleInputsChange1 = (e) => {
  //   setInputsValue1((currentState) => ({
  //     ...currentState,
  //     [e.target.id]: e.target.value,
  //   }));
  //   //chargeAble(inputsValue, setAble);
  // };
  // const handleInputsChange = (e) => {
  //   setInputsValue((currentState) => ({
  //     ...currentState,
  //     [e.target.id]: e.target.value,
  //   }));
  //   //chargeAble2(inputsValue, setAble);
  // };
  // useEffect(() => {
  //   console.log(addressRef);
  // }, [addressRef]);
  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <AddressForm
            // handleInputsChange1={handleInputsChange1}
            inputsValue1={inputsValue1}
            errorsState={errorsState}
            ref={addersFormRef}
          />
        );

      case 1:
        return (
          <Payment
            // handleInputsChange={handleInputsChange}
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
            // childState={childState}
            // childStatePay={childStatePay}
            dataFromServer={dataFromServer}
          />
        );
      default:
        throw new Error("Unknown step");
    }
  };

  // const [addressInfo, setAddressInfo] = React.useState({});
  const handleSoldItem = async () => {
    try {
      // const joiResponse = validateItem(inputsValue);
      // setErrorsState(joiResponse);
      // if (joiResponse) return;
      console.log("sold");
      setActiveStep(activeStep + 1);
      const { data } = await axios.put("/items/" + _id, {
        status: "sold",
      });
      console.log(data);
      //navigate(`${ROUTES.ORDERPLACED}/${_id}`);
    } catch (err) {
      console.log(err);
      // toast("Somthing is missing... try again", {
      //   position: "top-center",
      //   autoClose: 5000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      //   theme: "light",
      // });
    }
  };
  const handleNext = () => {
    if (activeStep === 0) {
      const childState = addersFormRef.current.getChildState();
      console.log(childState);
      setInputsValue1(childState);
      const joiResponse = validateAddress(childState);
      setErrorsState(joiResponse);

      if (joiResponse) return;
    }
    if (activeStep === 1) {
      const childStatePay = paymentFormRef.current.getChildState();
      console.log(childStatePay);
      setInputsValue(childStatePay);
      const joiResponsePay = validatePayment(childStatePay);
      setErrorStatePay(joiResponsePay);
      // console.log(errorsStatePay);
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
        {/* <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Company name
          </Typography>
        </Toolbar> */}
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
              {/* {errorsState && (
                <Alert severity="warning">{errorsState.country}</Alert>
              )} */}
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
