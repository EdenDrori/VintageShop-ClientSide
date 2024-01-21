import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { Alert } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useState, useEffect, forwardRef, useImperativeHandle } from "react";
const PaymentForm = forwardRef(({ inputsValue, errorStatePay }, ref) => {
  const [currentStatePay, setCurrent] = useState({});
  // useEffect(() => {
  //   setCurrent({ ...inputsValue });
  // }, [inputsValue]);

  const handleInputs = (e) => {
    setCurrent((currentStatePay) => ({
      ...currentStatePay,
      [e.target.id]: e.target.value,
    }));
    //console.log(currentStatePay);
  };

  useImperativeHandle(ref, () => ({
    getChildState: () => currentStatePay,
  }));
  // const PaymentForm = ({ handleInputsChange, inputsValue, errorStatePay }) => {
  // const handleInputs = (e) => {
  //   handleInputsChange(e);
  // };
  // console.log(errorStatePay);
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
          />
          {errorStatePay && errorStatePay.cardNumber && (
            <Alert severity="warning">{errorStatePay.cardNumber}</Alert>
          )}
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="expDate"
            label="Expiry date"
            fullWidth
            autoComplete="cc-exp"
            variant="standard"
            value={currentStatePay.expDate}
            onChange={handleInputs}
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
