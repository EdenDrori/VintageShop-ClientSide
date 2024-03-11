import * as React from "react";
import { useEffect } from "react";
import Grid from "@mui/material/Grid";
import { Alert } from "@mui/material";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { useState, forwardRef, useImperativeHandle } from "react";
const AddressForm = forwardRef(
  ({  inputsValue1, errorsState }, ref) => {
    const [currentState, setCurrent] = useState({ });
    useEffect(()=>{
setCurrent({...inputsValue1});
    },[inputsValue1])
    
    const handleInputs = (e) => {
      setCurrent((currentState) => ({
        ...currentState,
        [e.target.id]: e.target.value,
      }));
      
    };

    useImperativeHandle(ref, () => ({
      getChildState: () => currentState,
    }));

    return (
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
          Address
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              required
              id="first"
              name="firstName"
              label="First name"
              fullWidth
              autoComplete="given-name"
              variant="standard"
              value={currentState.first}
              onChange={handleInputs}
              InputLabelProps={{
                shrink: Boolean(currentState.first),
              }}
            />
            {errorsState && errorsState.first && (
              <Alert severity="warning">{errorsState.first}</Alert>
            )}
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              required
              id="last"
              name="lastName"
              label="Last name"
              fullWidth
              autoComplete="family-name"
              variant="standard"
              value={currentState.last}
              onChange={handleInputs}
              InputLabelProps={{
                shrink: Boolean(currentState.last),
              }}
            />
            {errorsState && errorsState.last && (
              <Alert severity="warning">{errorsState.last}</Alert>
            )}
          </Grid>

          <Grid item xs={12}>
            <TextField
              required
              id="street"
              name="street"
              label="Street"
              fullWidth
              autoComplete="street"
              variant="standard"
              value={currentState.street}
              onChange={handleInputs}
              InputLabelProps={{
                shrink: Boolean(currentState.street),
              }}
            />
            {errorsState && errorsState.street && (
              <Alert severity="warning">{errorsState.street}</Alert>
            )}
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              required
              id="city"
              name="city"
              label="City"
              fullWidth
              autoComplete="shipping address-level2"
              variant="standard"
              value={currentState.city}
              onChange={handleInputs}
              InputLabelProps={{
                shrink: Boolean(currentState.city),
              }}
            />
            {errorsState && errorsState.city && (
              <Alert severity="warning">{errorsState.city}</Alert>
            )}
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              required
              id="country"
              name="country"
              label="Country"
              fullWidth
              autoComplete="shipping country"
              variant="standard"
              value={currentState.country}
              onChange={handleInputs}
              InputLabelProps={{
                shrink: Boolean(currentState.country),
              }}
            />
            {errorsState && errorsState.country && (
              <Alert severity="warning">{errorsState.country}</Alert>
            )}
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
);
export default AddressForm;
