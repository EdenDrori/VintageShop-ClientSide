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
    .messages({
      "string.pattern.base":
        "The  expiration date should be on this 00/0000 format",
      "string.empty": "Password is not allowed to be empty",
    }),
  cvv: Joi.number().min(1).max(999).required(),
});

const validatePayment = (inputToCheck) =>
  validation(paymentSchema, inputToCheck);

export { validatePayment };
