import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { Alert } from "@mui/material";
import { useState, forwardRef, useImperativeHandle } from "react";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import getCardCompany from "./getCardCompany";

const PaymentForm = forwardRef(({ inputsValue, errorStatePay }, ref) => {
  const [currentStatePay, setCurrent] = useState({});

  const handleInputs = (e) => {
    setCurrent((currentStatePay) => ({
      ...currentStatePay,
      [e.target.id]: e.target.value,
    }));
    let { id, value } = e.target;
    if (
      id === "expDate" &&
      value.length === 2 &&
      currentStatePay.expDate.length === 1
    ) {
      value += "/";
    }

    setCurrent((currentStatePay) => ({
      ...currentStatePay,
      [id]: value,
    }));
  };
  useImperativeHandle(ref, () => ({
    getChildState: () => currentStatePay,
  }));
  const renderCreditCardIcon = () => {
    const cardCompany = getCardCompany(currentStatePay.cardNumber);

    
    const logoMap = {
      visa: "https://firebasestorage.googleapis.com/v0/b/shopapp-1141a.appspot.com/o/images%2Fbf6306b1-2dc3-4313-a21a-1c17d50eb3ca_Visa_logo_PNG4.png?alt=media&token=23773830-c886-4eb7-a88b-05809b5a26ec",
      mastercard:
        "https://firebasestorage.googleapis.com/v0/b/shopapp-1141a.appspot.com/o/images%2F8c2e10f0-f583-45b9-b7fe-37ecd0549441_Mastercard_logo_PNG4.png?alt=media&token=dc6ab8dc-69c7-4d66-9803-f937e5aa907b", 
      amex: "https://firebasestorage.googleapis.com/v0/b/shopapp-1141a.appspot.com/o/images%2F754c8396-744d-4445-9cf3-e8a6c2b84465_American_Express.png?alt=media&token=b3a345e7-1178-451c-9b5a-f17b741780db", 
     
    };
    
    const LogoComponent = logoMap[cardCompany] ? (
      <img
        src={logoMap[cardCompany]}
        alt={cardCompany}
        style={{
          maxWidth: "50px", 
          maxHeight: "30px", 
        }}
      />
    ) : (
      <CreditCardIcon style={{ fontSize: 30, color: "#000" }} />
    );

    return LogoComponent;
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardName"
            label="Name on card"
            fullWidth
            autoComplete="cc-name"
            variant="standard"
            value={currentStatePay.cardName}
            onChange={handleInputs}
          />
          {errorStatePay && errorStatePay.cardName && (
            <Alert severity="warning">{errorStatePay.cardName}</Alert>
          )}
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardNumber"
            label="Card number"
            fullWidth
            autoComplete="cc-number"
            variant="standard"
            value={currentStatePay.cardNumber}
            onChange={handleInputs}
            InputProps={{
              endAdornment: renderCreditCardIcon(),
            }}
          />
          {errorStatePay && errorStatePay.cardNumber && (
            <Alert severity="warning">{errorStatePay.cardNumber}</Alert>
          )}
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="expDate"
            label="Expiry date "
            fullWidth
            autoComplete="cc-exp"
            variant="standard"
            value={currentStatePay.expDate}
            onChange={handleInputs}
            helperText="MM/YYYY"
          />
          {errorStatePay && errorStatePay.expDate && (
            <Alert severity="warning">{errorStatePay.expDate}</Alert>
          )}
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cvv"
            label="CVV"
            helperText="Last three digits on signature strip"
            fullWidth
            autoComplete="cc-csc"
            variant="standard"
            value={currentStatePay.cvv}
            onChange={handleInputs}
          />
          {errorStatePay && errorStatePay.cvv && (
            <Alert severity="warning">{errorStatePay.cvv}</Alert>
          )}
        </Grid>
      </Grid>
    </React.Fragment>
  );
});
export default PaymentForm;
