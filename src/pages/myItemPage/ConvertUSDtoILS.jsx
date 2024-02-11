import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";

const ConvertCurrency = ({ api_key, amount }) => {
  const [convertedAmount, setConvertedAmount] = useState(0);

  useEffect(() => {
    const convertUSDToILS = async () => {
      if (!amount) {
        return;
      }
      try {
        const response = await fetch(
          `http://data.fixer.io/api/latest?access_key=${api_key}`
        );
        const data = await response.json();

        if (!data.success) {
          console.error(`Error: ${data.error.info}`);
          const amountInILSDefault = amount * 3.5;
          setConvertedAmount(amountInILSDefault);
          return;
        }

        const usdToIlsRate = data.rates.ILS;

        const amountInILS = amount * usdToIlsRate;

        setConvertedAmount(amountInILS.toFixed(2));
      } catch (error) {
        console.error(`Error: ${error}`);
      }
    };

    convertUSDToILS();
  }, [api_key, amount]);

  return (
    <Box
      sx={{
        backgroundColor: "sectionBackground.default",
        padding: 4,
        textAlign: "center",
      }}
    >
      <p style={{ display: !amount ? "none" : "flex" }}>
        {`${amount} USD is approximately`} <br /> {` ${convertedAmount} ILS`}
      </p>
    </Box>
  );
};

// // Example usage:
// const YourReactComponent = () => {
//   const apiKey = "69eb4eb0b7cdf5687d7f3464639f7935"; // Replace with your API key
//   const usdAmount = 25; // Replace with the amount you want to convert from USD to ILS

//   return <ConvertCurrency api_key={apiKey} amount={usdAmount} />;
// };

export default ConvertCurrency;
