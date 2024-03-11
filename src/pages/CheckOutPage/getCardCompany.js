
const getCardCompany = (cardNumber) => {
      if (!cardNumber || typeof cardNumber !== "string") {
        return "unknown"; 
      }
  const firstFourDigits = cardNumber.substring(0, 4);


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

 
  return "unknown";
};
export default getCardCompany;
