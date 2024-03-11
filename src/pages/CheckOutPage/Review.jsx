import * as React from "react";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";

const Review = ({ inputsValue, inputsValue1, dataFromServer }) => {
  const addresses = [
    inputsValue1.street,
    inputsValue1.city,
    inputsValue1.country,
    inputsValue1.first,
    inputsValue1.last,
  ];
  const formatCardNumber = (cardNumber) => {
    if (!cardNumber) return;
    const maskedNumber = "XXXXXXXXX" + cardNumber.slice(-4);
    return maskedNumber;
  };
  const payments = [
    { name: "Card holder", detail: inputsValue.cardName },
    { name: "Card number", detail: formatCardNumber(inputsValue.cardNumber) },
    { name: "Expiry date", detail: inputsValue.expDate },
  ];
 
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText
            primary={dataFromServer.title}
            secondary={dataFromServer.description}
          />
        </ListItem>

        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {dataFromServer.price} $
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Shipping
          </Typography>
          <Typography gutterBottom>
            {inputsValue1.first} {inputsValue1.last}
          </Typography>
          <Typography gutterBottom>{addresses.join(", ")}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} md={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Payment details
          </Typography>
          <Grid container>
            {payments.map((payment) => (
              <React.Fragment key={payment.name}>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.detail}</Typography>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
export default Review;
