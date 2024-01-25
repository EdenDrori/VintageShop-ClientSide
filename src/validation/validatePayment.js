import Joi from "joi";
import validation from "./validation";

const paymentSchema = Joi.object({
  cardName: Joi.string().required().min(2).max(256),
  cardNumber: Joi.string().required().min(6).max(20),
  expDate: Joi.string()
    .min(2)
    .max(256)
    .required()
    .pattern(new RegExp(/^(0[1-9]|1[0-2])\/\d{4}$/))
    .custom((value, helpers) => {
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth() + 1; // January is 0

      const [inputMonth, inputYear] = value.split("/").map(Number);

      if (
        inputYear < currentYear ||
        (inputYear === currentYear && inputMonth < currentMonth)
      ) {
        return helpers.message({
          custom:
            "Expiration date must be later than the current month and year",
        });
      }

      return value; // Return the original value if validation passes
    })
    .messages({
      "string.pattern.base":
        "Check that you filled date on this MM/YYYY format and the correct date expiration",
      "string.empty": "This field is required",
    }),
  cvv: Joi.number().min(1).max(999).required(),
});

const validatePayment = (inputToCheck) =>
  validation(paymentSchema, inputToCheck);

export { validatePayment };
