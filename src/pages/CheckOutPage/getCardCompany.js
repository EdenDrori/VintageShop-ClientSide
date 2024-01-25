// utility function to identify credit card company
const getCardCompany = (cardNumber) => {
      if (!cardNumber || typeof cardNumber !== "string") {
        return "unknown"; // Handle cases where cardNumber is undefined or not a string
      }
  const firstFourDigits = cardNumber.substring(0, 4);

  // Add more conditions for other credit card companies
  if (firstFourDigits.startsWith("4")) {
    return "visa";
  } else if (firstFourDigits.startsWith("5")) {
    return "mastercard";
  } else if (
    firstFourDigits.startsWith("34") ||
    firstFourDigits.startsWith("37")
  ) {
    return "amex";
  }

  // Add more conditions as needed
  return "unknown";
};
export default getCardCompany;
